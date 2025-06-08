package com.outsmart.dto;

import com.outsmart.entities.PlanType;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
public class UserProfileDTO {
    private String name;
    private String email;
    private boolean isActive;
    private String planType;
    private int totalUsed;
    private int uploadLimit;
    private int remainingChances;
}
