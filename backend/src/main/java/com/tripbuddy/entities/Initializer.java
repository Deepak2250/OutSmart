package com.tripbuddy.entities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tripbuddy.repositories.RoleRepository;

import jakarta.annotation.PostConstruct;

// This class will help to intialize the user and admin role just after the bean intialization of the whole app
// because we have added the @PostContruct which help us to do it 
@Component
public class Initializer {

    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    public void init() {
        initializeRoles();
    }

    public void initializeRoles() {
        // Check if the "USER" role exists, if not, create it
        if (!roleRepository.existsByRole("USER")) {
            RolesEntity userRole = new RolesEntity();
            userRole.setRole("USER");
            roleRepository.save(userRole);
        }

    }
}
