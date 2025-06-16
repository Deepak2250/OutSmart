package com.outsmart.controllers;

import com.outsmart.annotations.UserAuditableAction;
import com.outsmart.dto.JwtAuthResponse;
import com.outsmart.services.auth.GoogleOauthservice;

import lombok.extern.slf4j.Slf4j;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/google")
@Slf4j
public class GoogleOauthController {

    @Autowired
    private GoogleOauthservice googleOauthService;

    /**
     * Endpoint to handle the OAuth2 callback from Google.
     * Frontend should hit this endpoint with the authorization code.
     *
     * @param code the authorization code provided by Google
     * @return JWT token if authentication is successful
     */
    @UserAuditableAction(action = "LOGIN_GOOGLE")
    @GetMapping("/callback")
    public ResponseEntity<JwtAuthResponse> handleGoogleCallback(@RequestParam("code") String code) {
        String decodedCode = URLDecoder.decode(code, StandardCharsets.UTF_8);

        String jwtToken = googleOauthService.googleAuthentication(code);
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse(jwtToken, "User registered successfully");

        // Return the token in the response
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Authorization", "Bearer " + jwtToken) // Set the JWT token in the response header
                .header("Content-Type", "application/json") // Set the content type to JSON
                .body(jwtAuthResponse); // Return the JWT token in the response body);
    }
}
