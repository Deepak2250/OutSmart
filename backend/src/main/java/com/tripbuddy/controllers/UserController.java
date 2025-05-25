// controller/UserController.java
package com.tripbuddy.controllers;

import com.tripbuddy.dto.UserProfileDTO;
import com.tripbuddy.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasAuthority('USER')")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(Authentication authentication) {
        UserProfileDTO profile = userService.getUserProfile(authentication);
        return ResponseEntity.ok(profile);
    }
}
