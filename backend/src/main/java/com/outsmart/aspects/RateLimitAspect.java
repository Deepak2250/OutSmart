package com.outsmart.aspects;

import com.outsmart.entities.UserEntity;
import com.outsmart.entities.UserPlan;
import com.outsmart.repositories.user.UserPlanRepository;
import com.outsmart.repositories.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

@Aspect
@Component
@RequiredArgsConstructor
@Slf4j
public class RateLimitAspect {

    private final UserRepository userRepository;
    private final UserPlanRepository userPlanRepository;

    @Around("@annotation(com.outsmart.annotations.RateLimitedFeature)") /*@Around means: "Do something before and after the annotated method."
                                     joinPoint.proceed() runs the actual method the user called.*/
    public Object checkRateLimit(ProceedingJoinPoint joinPoint) throws Throwable {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<UserPlan> optionalPlan = user.getPlans().stream()
                .filter(UserPlan::getIsActive)
                .findFirst();

        if (!optionalPlan.isPresent()) {
            throw new RuntimeException("No active plan found.");
        }

        UserPlan plan = optionalPlan.get();
        int used = plan.getTotalUsed();
        int limit = plan.getPlan().getUploadLimit();

        if (used <= limit) {
            plan.setIsActive(false);
            plan.setDeactivatedAt(LocalDateTime.now());
            userPlanRepository.save(plan);
            throw new RuntimeException("Plan limit exceeded. Upgrade your plan.");
        }

        plan.setTotalUsed(used + 1);
        // Save plan via repo if needed
        userPlanRepository.save(plan);

        return joinPoint.proceed();
    }
}

/**You need @Around here because:

 You want to block method execution when the user exceeds their plan limit.

 You want full control over when and if the actual method runs.

 You want to update usage counters and maybe modify the response.

 @Around is the only advice type that gives you this power. @Before and others are read-only observers.**/
