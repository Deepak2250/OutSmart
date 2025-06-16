package com.outsmart.payload.request;

import jakarta.validation.constraints.NotBlank;

public record UserActionRequest(@NotBlank(message = "The encrypted identifier should not be null") String encryptedIdentifier, @NotBlank(message = "The reason should not be null") String reason) {}
