package com.outsmart.controllers;

import com.outsmart.dto.OtpVerificationRequest;
import com.outsmart.services.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/request-otp")
    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        passwordResetService.sendOtpToEmail(email);
        return ResponseEntity.ok("OTP sent to your email.");
    }


    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtpAndResetPassword(@RequestBody OtpVerificationRequest otpVerificationRequest) {
        boolean success = passwordResetService.verifyOtpAndResetPassword(otpVerificationRequest.getEmail(), otpVerificationRequest.getOtp(), otpVerificationRequest.getNewPassword());
        if (!success) {
            return ResponseEntity.badRequest().body("Invalid or expired OTP");
        }
        return ResponseEntity.ok("Password has been reset successfully");
    }
}
