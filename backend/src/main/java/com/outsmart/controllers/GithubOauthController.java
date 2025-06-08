package com.outsmart.controllers;

import com.outsmart.dto.JwtAuthResponse;
import com.outsmart.services.GithubOauthService;

import lombok.extern.slf4j.Slf4j;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/github")
@Slf4j
public class GithubOauthController {

    @Autowired
    private GithubOauthService githubOauthService;

    @GetMapping("/callback")
    public ResponseEntity<JwtAuthResponse> handleGithubCallback(@RequestParam("code") String code) {
        String decodedCode = URLDecoder.decode(code, StandardCharsets.UTF_8);
        String jwtToken = githubOauthService.githubAuthentication(decodedCode);

        JwtAuthResponse response = new JwtAuthResponse(jwtToken, "GitHub user authenticated successfully");
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Authorization", "Bearer " + jwtToken)
                .header("Content-Type", "application/json")
                .body(response);
    }
}
