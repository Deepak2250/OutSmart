package com.outsmart.dto;

import com.outsmart.entities.Plan;
import com.outsmart.entities.PlanType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class PlanDto {
    private Integer id;
    @NotBlank(message = "The name should not be null")
    @Size(max = 20 , min = 2 , message = "The name should be at least 2 character and less then 20")
    private PlanType name;

    @NotBlank(message = "The description should not be null")
    @Size(max = 1000 , min = 10 , message = "The description should be at least 10 character and less then 1000")
    private String description;

    @NotBlank(message = "The upload limit should not be null")
    @Min(value = 1 , message = "The upload limit should be at least 1")
    @Max(value = 10000 , message = "The upload limit should be less then 10000")
    private Integer uploadLimit;

    @NotBlank(message = "The price should not be null")
    @Min(value = 1 , message = "The price should be at least 1")
    @Max(value = 10000 , message = "The price should be less then 10000")
    private BigDecimal price;

    @NotBlank(message = "The created at should not be null")
    private LocalDateTime createdAt;

    @NotBlank(message = "The updated at should not be null")
    private LocalDateTime updatedAt;

    @NotBlank(message = "The is active plan should not be null")
    private Boolean isActivePlan;

    public static PlanDto fromEntity(Plan plan) {
        if (plan == null) return null;

        return PlanDto.builder()
                .id(plan.getId())
                .name(plan.getName())
                .description(plan.getDescription())
                .uploadLimit(plan.getUploadLimit())
                .price(plan.getPrice())
                .createdAt(plan.getCreatedAt())
                .updatedAt(plan.getUpdatedAt())
                .isActivePlan(plan.getIsActivePlan())
                .build();
    }

    public Plan toEntity() {
        Plan plan = new Plan();
        plan.setName(this.name);
        plan.setDescription(this.description);
        plan.setUploadLimit(this.uploadLimit);
        plan.setPrice(this.price);
        plan.setCreatedAt(this.createdAt);
        plan.setUpdatedAt(this.updatedAt);
        plan.setIsActivePlan(this.isActivePlan);
        return plan;
    }
}
