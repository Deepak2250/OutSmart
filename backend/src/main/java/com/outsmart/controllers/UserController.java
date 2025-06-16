// controller/UserController.java
package com.outsmart.controllers;
import com.outsmart.annotations.UserAuditableAction;
import com.outsmart.dto.UserAuditLogResponse;
import com.outsmart.payload.users.UserProfileDTO;
import com.outsmart.payload.users.UserUpdateRequest;
import com.outsmart.services.feature.PasswordResetService;
import com.outsmart.services.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordResetService passwordResetService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile() {
        UserProfileDTO profile = userService.getUserProfile();
        return ResponseEntity.ok(profile);
    }


    @UserAuditableAction(action = "DELETE_ACCOUNT")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUserAccount() {
        userService.deleteUserByEmail();
        return ResponseEntity.ok("User account deleted successfully.");
    }

    @UserAuditableAction(action = "UPDATE_PROFILE")
    @PutMapping("/update")
    public ResponseEntity<UserProfileDTO> updateUser(@Valid @RequestBody UserUpdateRequest request) {
             userService.updateUserProfile( request);
        UserProfileDTO updatedUserProfile = userService.getUserProfile();
        return ResponseEntity.ok().body(updatedUserProfile);
    }

        @GetMapping("/recent")
        public ResponseEntity<List<UserAuditLogResponse>> getUserRecentActivity() {
          List<UserAuditLogResponse> response = userService.getUserAuditLog();
            return ResponseEntity.ok(response);
    }



}
