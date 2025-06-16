package com.outsmart.entities;

import com.outsmart.config.EncoderConfig;
import com.outsmart.repositories.user.PlanRepository;
import com.outsmart.repositories.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.outsmart.repositories.user.RoleRepository;

import jakarta.annotation.PostConstruct;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

// This class will help to intialize the user and admin role just after the bean intialization of the whole app
// because we have added the @PostContruct which help us to do it 
@Component
@RequiredArgsConstructor
public class Initializer {

    private final RoleRepository roleRepository;
    private final PlanRepository planRepository;
    private final UserRepository userRepository;
    private final EncoderConfig passwordEncoder;

    private static final String DEFAULT_ADMIN_EMAIL = "admin@outsmart.ai";
    private static final String DEFAULT_ADMIN_PASSWORD = "admin123"; // store securely in production

    @PostConstruct
    public void init() {
        initializeRoles();
        initializePlans();
        initializeAdminUser();
    }

    public void initializeRoles() {
        // Check if the "USER" role exists, if not, create it
        if (!roleRepository.existsByRole("USER")) {
            RolesEntity userRole = new RolesEntity();
            userRole.setRole("USER");
            roleRepository.save(userRole);
        }
        if (!roleRepository.existsByRole("ADMIN")) {
            RolesEntity userRole = new RolesEntity();
            userRole.setRole("ADMIN");
            roleRepository.save(userRole);
        }
    }

        public void initializePlans() {
            if (!planRepository.existsByName(PlanType.FREE)) {
                Plan plan = new Plan();
                plan.setName(PlanType.FREE);
                plan.setUploadLimit(1);
                plan.setIsActivePlan(true);
                plan.setPrice(BigDecimal.valueOf(0));
                plan.setDescription("Free Tier");
                plan.setCreatedAt(LocalDateTime.now());
                plan.setUpdatedAt(LocalDateTime.now());
                planRepository.save(plan);
        }
            if (!planRepository.existsByName(PlanType.BASIC)) {
                Plan plan = new Plan();
                plan.setName(PlanType.BASIC);
                plan.setUploadLimit(10);
                plan.setIsActivePlan(true);
                plan.setPrice(BigDecimal.valueOf(100));
                plan.setDescription("Basic Tier");
                plan.setCreatedAt(LocalDateTime.now());
                plan.setUpdatedAt(LocalDateTime.now());
                planRepository.save(plan);
            }
            if (!planRepository.existsByName(PlanType.PRO)) {
                Plan plan = new Plan();
                plan.setName(PlanType.PRO);
                plan.setUploadLimit(20);
                plan.setIsActivePlan(true);
                plan.setPrice(BigDecimal.valueOf(200));
                plan.setDescription("Pro Tier");
                plan.setCreatedAt(LocalDateTime.now());
                plan.setUpdatedAt(LocalDateTime.now());
                planRepository.save(plan);
            }
    }

    public void initializeAdminUser() {
        if (!userRepository.existsByEmail(DEFAULT_ADMIN_EMAIL)) {
            UserEntity admin = new UserEntity();
            admin.setEmail(DEFAULT_ADMIN_EMAIL);
            admin.setUsername("Deepak danix");
            admin.setPassword(passwordEncoder.passwordEncoder().encode(DEFAULT_ADMIN_PASSWORD));
            admin.setIsSuspended(false);
            admin.setCreatedAt(LocalDateTime.now());
            admin.setUpdatedAt(LocalDateTime.now());

            RolesEntity adminRole = roleRepository.findByRole("ADMIN").orElseThrow(() -> new RuntimeException("The Role doesn't Exists"));
            admin.setRolesEntities(Set.of(adminRole));
            userRepository.save(admin);
        }
    }

}
