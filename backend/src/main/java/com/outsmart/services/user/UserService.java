package com.outsmart.services.user;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.outsmart.annotations.AuthenticatedUser;
import com.outsmart.audit.UserAuditLog;
import com.outsmart.dto.UserAuditLogResponse;
import com.outsmart.payload.users.UserProfileDTO;
import com.outsmart.entities.*;
import com.outsmart.payload.users.UserUpdateRequest;
import com.outsmart.repositories.user.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsmart.config.EncoderConfig;
import com.outsmart.payload.users.UserRegistrationRequest;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final EncoderConfig passwordEncoder;
    private final RestTemplate restTemplate;
    private final PlanRepository planRepository;
    private final UserPlanRepository userPlanRepository;
    private final UserAuditLogRepository auditLogRepository;

    @Transactional
    public void registerUser(UserRegistrationRequest user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User with email already exists");
        }


        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(user.getName());
        // Encode the password
        userEntity.setPassword(passwordEncoder.passwordEncoder().encode(user.getPassword()));
        userEntity.setEmail(user.getEmail().toLowerCase());
        // Assign default role
        if (userEntity.getRolesEntities() == null) {
            RolesEntity defaultRole = roleRepository.findByRole("USER").orElseThrow(() -> new RuntimeException("Role Not Found"));
            userEntity.setRolesEntities(Set.of(defaultRole));
        }

        Plan freePlan = planRepository.findByName(PlanType.FREE)
                .orElseThrow(() -> new RuntimeException("Free plan not found"));

        // 4. Create a UserPlan for the FREE plan
        UserPlan userPlan = new UserPlan();
        userPlan.setPlan(freePlan);
        userPlan.setUser(userEntity);
        userPlan.setPurchasedAt(LocalDateTime.now());
        userPlan.setIsActive(true); // Set as active
        userPlan.setTotalUsed(0);

        // 5. Link plan to user
        Set<UserPlan> plans = new HashSet<>();
        plans.add(userPlan);
        userEntity.setPlans(plans);
        // Save the user
        userRepository.save(userEntity);
    }

    @Transactional
    @AuthenticatedUser
    public void deleteUserByEmail() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.getRolesEntities().stream()
                .peek(role -> role.getUsers().remove(user)) // Remove user from each role
                .forEach(roleRepository::save); // Save each updated role
        user.getRolesEntities().clear(); // Clear the user's roles

        // Finally delete the user
        userRepository.delete(user);
    }

    @Transactional
    @AuthenticatedUser
    public UserEntity updateUserProfile(UserUpdateRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (request.getName() != null && !request.getName().trim().isEmpty()) {
            user.setUsername(request.getName().trim());
        }
        if (request.getDescription() != null && !request.getDescription().trim().isEmpty()) {
            user.setDescription(request.getDescription().trim());
        }
        if (request.getProfession() != null && !request.getProfession().trim().isEmpty()) {
            user.setProfession(request.getProfession().trim());
        }
        if (request.getLocation() != null && !request.getLocation().trim().isEmpty()) {
            user.setLocation(request.getLocation().trim());
        }

        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    @AuthenticatedUser
    public List<UserAuditLogResponse> getUserAuditLog() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        List<UserAuditLog> logs = auditLogRepository.findTop10ByEmailOrderByTimestampDesc(email);

        return logs.stream()
                .map(log1 -> new UserAuditLogResponse(log1.getAction(), timeAgo(log1.getTimestamp())))
                .collect(Collectors.toList());
    }

    public UserProfileDTO getUserProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("No User Found")
        );

        UserPlan activePlan = user.getPlans().stream()
                .filter(UserPlan::getIsActive)
                .findFirst()
                .orElse(null);

        long totalResumeAnalyzed = user.getPlans().stream()
                .mapToLong(plan -> plan.getTotalUsed() != null ? plan.getTotalUsed() : 0L)
                .sum();
        Set<UserPlan> pastPlans = new HashSet<>(user.getPlans());


        int totalUsed = 0;
        int uploadLimit = 0;

        if (activePlan != null) {
            totalUsed = activePlan.getTotalUsed();
            uploadLimit = activePlan.getPlan().getUploadLimit();
        }

        return UserProfileDTO.fromEntity(user);
    }

    private String timeAgo(LocalDateTime timestamp) {
        Duration duration = Duration.between(timestamp, LocalDateTime.now());
        if (duration.toMinutes() < 60) return duration.toMinutes() + " minutes ago";
        else if (duration.toHours() < 24) return duration.toHours() + " hours ago";
        else return duration.toDays() + " days ago";
    }

}
