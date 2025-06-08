package com.outsmart.entities;

import com.outsmart.repositories.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.outsmart.repositories.RoleRepository;

import jakarta.annotation.PostConstruct;

// This class will help to intialize the user and admin role just after the bean intialization of the whole app
// because we have added the @PostContruct which help us to do it 
@Component
public class Initializer {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PlanRepository planRepository;

    @PostConstruct
    public void init() {
        initializeRoles();
        initializePlans();
    }

    public void initializeRoles() {
        // Check if the "USER" role exists, if not, create it
        if (!roleRepository.existsByRole("USER")) {
            RolesEntity userRole = new RolesEntity();
            userRole.setRole("USER");
            roleRepository.save(userRole);
        }
    }

        public void initializePlans() {
            if (!planRepository.existsByName(PlanType.FREE)) {
                Plan plan = new Plan();
                plan.setName(PlanType.FREE);
                plan.setUploadLimit(1);
                planRepository.save(plan);
        }
            if (!planRepository.existsByName(PlanType.BASIC)) {
                Plan plan = new Plan();
                plan.setName(PlanType.BASIC);
                plan.setUploadLimit(10);
                planRepository.save(plan);
            }
            if (!planRepository.existsByName(PlanType.PRO)) {
                Plan plan = new Plan();
                plan.setName(PlanType.PRO);
                plan.setUploadLimit(20);
                planRepository.save(plan);
            }

    }
}
