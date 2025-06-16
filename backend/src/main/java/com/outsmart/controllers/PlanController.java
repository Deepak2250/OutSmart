package com.outsmart.controllers;

import com.outsmart.payload.features.PlanPurchaseRequest;
import com.outsmart.services.feature.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/plan")
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
public class PlanController {

    private final PlanService planService;

    ///@UserAuditableAction(action = "PURCHASED_PLAN") // might change it according to the plan type in future
    @PostMapping("/purchase")
    public ResponseEntity<String> purchasePlan(@RequestBody PlanPurchaseRequest request) {

        planService.purchasePlan(request.getPlanType());
        return ResponseEntity.ok("Plan purchased successfully!");
    }

   // @UserAuditableAction(action = "CANCEL_PLAN")
    @DeleteMapping("/cancel")
    public ResponseEntity<String> cancelPlan() {
        planService.cancelActivePlan();
        return ResponseEntity.ok("Plan cancelled successfully.");
    }

}
