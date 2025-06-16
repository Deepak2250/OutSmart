package com.outsmart.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record BulkDeleteRequest(
        @NotNull(message = "Entity list cannot be null")
        List<@NotBlank(message = "Entity name cannot be blank") String> entityTypes,

        @NotNull(message = "The reason should not be null") String reason // optional: useful for audit logging
) {}
