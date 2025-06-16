package com.outsmart.payload.request;

import jakarta.validation.constraints.NotBlank;

public record UserIdentifierRequest(@NotBlank(message = "The encrypted email should not be null") String encryptedEmail , @NotBlank(message = "The reason should not be null") String reason) {}