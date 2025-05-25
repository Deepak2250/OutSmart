package com.tripbuddy.controllers;

import com.tripbuddy.dto.UserProfileDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.tripbuddy.config.jwtconfig.JwtService;
import com.tripbuddy.dto.JwtAuthResponse;
import com.tripbuddy.dto.UserLoginRequest;
import com.tripbuddy.dto.UserRegistrationRequest;
import com.tripbuddy.services.UserService;

@RestController
@RequestMapping("/api/auth") // Base URL for user-related endpoints
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Validated @RequestBody UserRegistrationRequest request) {
        userService.registerUser(request);
        String jwtToken = jwtService.authentication(request.getEmail(), request.getPassword());
        if (jwtToken == null || jwtToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to generate JWT token");
        }
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse(jwtToken, "User registered successfully");

        // Return the token in the response
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Authorization", "Bearer " + jwtToken) // Set the JWT token in the response header
                .header("Content-Type", "application/json") // Set the content type to JSON
                .body(jwtAuthResponse); // Return the JWT token in the response body);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> loginUser(@RequestBody UserLoginRequest request) {
        String jwtToken = jwtService.authentication(request.getEmail(), request.getPassword());

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse(jwtToken, "Login successful");

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jwtAuthResponse);
    }
}
