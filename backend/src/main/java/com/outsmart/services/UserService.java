package com.outsmart.services;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import com.outsmart.dto.UserProfileDTO;
import com.outsmart.entities.*;
import com.outsmart.repositories.PlanRepository;
import com.outsmart.repositories.UserPlanRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsmart.config.EncoderConfig;
import com.outsmart.dto.UserRegistrationRequest;
import com.outsmart.repositories.RoleRepository;
import com.outsmart.repositories.UserRepository;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EncoderConfig passwordEncoder;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private UserPlanRepository userPlanRepository;

    @Transactional
    public UserEntity registerUser(UserRegistrationRequest user) {
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
        if(userEntity.getRolesEntities() == null){
            RolesEntity defaultRole = roleRepository.findByRole("USER");
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
        return userRepository.save(userEntity);
    }

    @Transactional
    public void deleteUserByEmail(Authentication authentication) {
        UserEntity user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Deactivate all active plans and set deactivatedAt timestamp
        user.getPlans().forEach(plan -> {
            if (Boolean.TRUE.equals(plan.getIsActive())) {
                plan.setIsActive(false);
                plan.setDeactivatedAt(LocalDateTime.now());
            }
        });
        userPlanRepository.saveAll(user.getPlans());
        userRepository.delete(user);
    }


    public UserProfileDTO getUserProfile(Authentication authentication) {
        String email = authentication.getName();
        UserEntity user = userRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("No User Found")
        );

        UserPlan activePlan = user.getPlans().stream()
                .filter(UserPlan::getIsActive)
                .findFirst()
                .orElse(null);

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
                .build();
    }


}
