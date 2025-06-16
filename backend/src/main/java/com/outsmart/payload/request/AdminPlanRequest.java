package com.outsmart.payload.request;

import com.outsmart.dto.PlanDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public record AdminPlanRequest( @Valid PlanDto planDto , @NotBlank(message = "The reason should not be null") String reason) {
}
