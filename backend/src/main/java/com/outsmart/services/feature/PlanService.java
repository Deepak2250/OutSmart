package com.outsmart.services.feature;

import com.outsmart.annotations.AuthenticatedUser;
import com.outsmart.entities.*;
import com.outsmart.repositories.user.PlanRepository;
import com.outsmart.repositories.user.UserPlanRepository;
import com.outsmart.repositories.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    private final UserPlanRepository userPlanRepository;

    @Transactional
    @AuthenticatedUser
    public void purchasePlan(PlanType planType) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("SignUp Or SignIn First"));

        Plan newPlan = planRepository.findByName(planType)
                .orElseThrow(() -> new RuntimeException("Selected plan not available"));

        // ❌ Prevent duplicate purchase
        boolean alreadyActive = user.getPlans().stream()
                .anyMatch(p -> p.getIsActive() && p.getPlan().getName().equals(planType));

        boolean alreadyActivePlan = user.getPlans().stream()
                .anyMatch(p -> p.getIsActive() && !p.getPlan().getName().equals(PlanType.FREE));


        if (alreadyActivePlan) {
            throw new IllegalStateException("You already have an active plan. Please cancel it before purchasing a new one.");
        }

        if (alreadyActive) {
            throw new RuntimeException("You already have this plan active.");
        }

        // ⛔ Prevent downgrade
        UserPlan currentPlan = user.getPlans().stream()
                .filter(UserPlan::getIsActive)
                .findFirst()
                .orElse(null);

        if (currentPlan != null) {
            int currentRank = getPlanRank(currentPlan.getPlan().getName());
            int newRank = getPlanRank(planType);
            if (newRank <= currentRank) {
                throw new RuntimeException("Downgrade or same plan not allowed.");
            }
        }

        // Create new active UserPlan
        UserPlan newUserPlan = new UserPlan();
        newUserPlan.setUser(user);
        newUserPlan.setPlan(newPlan);
        newUserPlan.setIsActive(true);
        newUserPlan.setTotalUsed(0);
        newUserPlan.setPurchasedAt(LocalDateTime.now());

        // Add to user's plan set
        user.getPlans().add(newUserPlan);

        // Save user and plans
        userRepository.save(user);
    }

    @Transactional
    public void cancelActivePlan() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<UserPlan> activePlanOpt = user.getPlans().stream()
                .filter(UserPlan::getIsActive)
                .findFirst();

        if (activePlanOpt.isEmpty()) {
            throw new RuntimeException("No active plan to cancel.");
        }

        UserPlan activePlan = activePlanOpt.get();
        activePlan.setIsActive(false);
        activePlan.setDeactivatedAt(LocalDateTime.now());
        userPlanRepository.save(activePlan);
    }


    private int getPlanRank(PlanType plan) {
        return switch (plan) {
            case FREE -> 1;
            case BASIC -> 2;
            case PRO -> 3;
            case EXTREME -> 4;
        };
    }
}

