package com.outsmart.payload.features;

import com.outsmart.entities.PlanType;
import lombok.Data;

@Data
public class PlanPurchaseRequest {
    private PlanType planType;
}
