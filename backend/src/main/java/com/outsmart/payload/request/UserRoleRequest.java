package com.outsmart.payload.request;

import jakarta.validation.constraints.NotBlank;

public record UserRoleRequest(@NotBlank(message = "The encrypted email should not be null") String encryptedEmail, @NotBlank(message = "The new role should not be null") String role , @NotBlank(message = "The reason should not be null") String reason) {}