package com.outsmart.controllers;

import com.outsmart.dto.PlanPurchaseRequest;
import com.outsmart.services.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/plan")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('USER')")
public class PlanController {

    private final PlanService planService;

    @PostMapping("/purchase")
    public ResponseEntity<String> purchasePlan(@RequestBody PlanPurchaseRequest request,
                                               Authentication authentication) {

        planService.purchasePlan(authentication, request.getPlanType());
        return ResponseEntity.ok("Plan purchased successfully!");
    }

    @DeleteMapping("/cancel")
    public ResponseEntity<String> cancelPlan(Authentication authentication) {
        planService.cancelActivePlan(authentication);
        return ResponseEntity.ok("Plan cancelled successfully.");
    }

}
