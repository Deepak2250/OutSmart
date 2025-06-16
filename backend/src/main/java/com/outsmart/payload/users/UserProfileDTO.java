package com.outsmart.payload.users;

import com.outsmart.entities.RolesEntity;
import com.outsmart.entities.UserEntity;
import com.outsmart.entities.UserPlan;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

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
    private long totalResumeAnalyzed;
    private String description;
    private String profession;
    private String location;
    private Set<UserPlan> pastPlans;
    private LocalDateTime lastLoginAt;
    private boolean isSuspended;
    private Set<String> roles;

    public static UserProfileDTO fromEntity(UserEntity user) {
        if (user == null) return null;

        UserPlan activePlan = user.getPlans().stream()
                .filter(UserPlan::getIsActive)
                .findFirst()
                .orElse(null);

        long totalResumeAnalyzed = user.getPlans().stream()
                .mapToLong(plan -> plan.getTotalUsed() != null ? plan.getTotalUsed() : 0L)
                .sum();
        Set<UserPlan> pastPlans = new HashSet<>(user.getPlans());
        Set<String> roles = user.getRolesEntities().stream().map(RolesEntity::getRole).collect(Collectors.toSet());


        int totalUsed = 0;
        int uploadLimit = 0;

        if (activePlan != null) {
            totalUsed = activePlan.getTotalUsed();
            uploadLimit = activePlan.getPlan().getUploadLimit();
        }

        return UserProfileDTO.builder()
                .email(user.getEmail())
                .name(user.getUsername())
                .isActive(activePlan != null && activePlan.getIsActive())
                .planType(activePlan != null ? activePlan.getPlan().getName().name() : null)
                .totalUsed(totalUsed)
                .uploadLimit(uploadLimit)
                .remainingChances(uploadLimit - totalUsed)
                .totalResumeAnalyzed(totalResumeAnalyzed)
                .pastPlans(pastPlans)
                .description(user.getDescription())
                .location(user.getLocation())
                .profession(user.getProfession())
                .lastLoginAt(user.getLastLoginAt())
                .isSuspended(user.getIsSuspended())
                .roles(roles)
                .build();
    }


}
