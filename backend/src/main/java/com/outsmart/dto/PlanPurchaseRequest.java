package com.outsmart.dto;

import com.outsmart.entities.PlanType;
import lombok.Data;

@Data
public class PlanPurchaseRequest {
    private PlanType planType;
}
