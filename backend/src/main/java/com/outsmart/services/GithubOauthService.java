package com.outsmart.services;

import com.outsmart.config.jwtconfig.JwtService;
import com.outsmart.exceptions.OAuthException;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class GithubOauthService {

    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.github.redirect-uri}")
    private String redirectUri;
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    public String githubAuthentication(String code) {
        try {
            // Exchange code for access token
            String tokenUrl = "https://github.com/login/oauth/access_token";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));

            Map<String, String> tokenRequest = Map.of(
                    "client_id", clientId,
                    "client_secret", clientSecret,
                    "code", code
            );

            HttpEntity<Map<String, String>> request = new HttpEntity<>(tokenRequest, headers);
            ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenUrl, request, Map.class);
            String accessToken = (String) tokenResponse.getBody().get("access_token");

            if (accessToken == null) {
                throw new OAuthException("Failed to retrieve GitHub access token");
            }

            // Fetch user info
            HttpHeaders userHeaders = new HttpHeaders();
            userHeaders.setBearerAuth(accessToken);
            userHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<Void> userRequest = new HttpEntity<>(userHeaders);

            ResponseEntity<Map> userInfoResponse = restTemplate.exchange(
                    "https://api.github.com/user",
                    HttpMethod.GET,
                    userRequest,
                    Map.class
            );

            Map<String, Object> userInfo = userInfoResponse.getBody();

            if (userInfo == null || userInfo.get("email") == null) {
                ResponseEntity<Object[]> emailResponse = restTemplate.exchange(
                        "https://api.github.com/user/emails",
                        HttpMethod.GET,
                        userRequest,
                        Object[].class
                );

                String primaryEmail = null;

                for (Object emailObj : emailResponse.getBody()) {
                    Map<String, Object> emailMap = (Map<String, Object>) emailObj;
                    if (Boolean.TRUE.equals(emailMap.get("primary")) && Boolean.TRUE.equals(emailMap.get("verified"))) {
                        primaryEmail = (String) emailMap.get("email");
                        break;
                    }
                }

                if (primaryEmail == null) {
                    throw new OAuthException("Primary email not found or is null in GitHub user info");
                }

                userInfo.put("email", primaryEmail);
            }


            String email = (String) userInfo.get("email");
            String name = (String) userInfo.get("name");

            log.info("Processing GitHub user: {} ({})", name, email);
            UserDetails userDetails;

            try {
                userDetails = userDetailsServiceImpl.loadUserByUsername(email);
                log.info("Existing GitHub user found: {}", email);
            } catch (UsernameNotFoundException e) {
                log.info("Creating new GitHub user: {}", email);
                userDetails = userDetailsServiceImpl.createUser(email, name);
            }

            return generateJwtForUser(email);

        } catch (Exception e) {
            log.error("GitHub OAuth error", e);
            throw new OAuthException("GitHub OAuth error: " + e.getMessage());
        }
    }

    private String generateJwtForUser(String email) {
        String jwtToken = jwtService.authentication(email, null);
        if (jwtToken == null || jwtToken.isEmpty()) {
            throw new OAuthException("Failed to generate JWT for GitHub user");
        }
        return jwtToken;
    }
}
