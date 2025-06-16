package com.outsmart.payload.request;

import com.outsmart.entities.PlanType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record UserPlanRequest(@NotBlank(message = "The encrypted email should not be null") String encryptedEmail, @NotNull(message = "The plan type should not be null") PlanType planType, @NotBlank(message = "The reason should not be null") String reason) {}