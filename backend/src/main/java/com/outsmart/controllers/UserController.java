// controller/UserController.java
package com.outsmart.controllers;
import com.outsmart.dto.UserProfileDTO;
import com.outsmart.services.PasswordResetService;
import com.outsmart.services.UserService;
import jakarta.validation.Valid;
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

    @Autowired
    private PasswordResetService passwordResetService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(Authentication authentication) {
        UserProfileDTO profile = userService.getUserProfile(authentication);
        return ResponseEntity.ok(profile);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUserAccount(Authentication authentication) {
        userService.deleteUserByEmail(authentication);
        return ResponseEntity.ok("User account deleted successfully.");
    }

}
