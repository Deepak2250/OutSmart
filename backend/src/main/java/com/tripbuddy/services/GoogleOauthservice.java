package com.tripbuddy.services;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.tripbuddy.config.jwtconfig.JwtService;
import com.tripbuddy.exceptions.OAuthException;

@Service
public class GoogleOauthservice {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    public String googleAuthentication(String code) {
        String tokenUrl = "https://oauth2.googleapis.com/token";

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> tokenResponse = restTemplate.postForObject(tokenUrl, requestEntity, Map.class);

            if (tokenResponse == null || !tokenResponse.containsKey("access_token")) {
                throw new OAuthException("Failed to retrieve access token from Google.");
            }

            String accessToken = (String) tokenResponse.get("access_token");
            String userInfoUrl = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;

            ResponseEntity<Map> userInfoResponse = restTemplate.getForEntity(userInfoUrl, Map.class);
            @SuppressWarnings("unchecked")
            Map<String, Object> userInfo = userInfoResponse.getBody();

            if (userInfo == null || !userInfo.containsKey("email")) {
                throw new OAuthException("Failed to retrieve user information from Google.");
            }

            String email = (String) userInfo.get("email");
            String name = (String) userInfo.get("name");

            UserDetails userDetails;

            try {
                userDetailsServiceImpl.loadUserByUsername(email);
            } catch (UsernameNotFoundException e) {
                userDetails = userDetailsServiceImpl.createUser(email, name);
            }

            return generateJwtForUser(email);

        } catch (Exception e) {
            throw new OAuthException("Google OAuth error: " + e.getMessage());
        }
    }


    private String generateJwtForUser(String email) {
        String jwtToken = jwtService.authentication(email, null);
        if (jwtToken == null || jwtToken.isEmpty()) {
            throw new OAuthException("Failed to generate JWT for user");
        }
        return jwtToken;
    }
}