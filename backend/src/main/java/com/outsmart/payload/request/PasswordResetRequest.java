package com.outsmart.payload.request;

import jakarta.validation.constraints.NotBlank;

public record PasswordResetRequest(@NotBlank(message = "The encrypted email should not be null") String encryptedEmail, @NotBlank(message = "The new password should not be null") String newPassword, @NotBlank(message = "The reason should not be null") String reason) {}