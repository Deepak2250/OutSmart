package com.tripbuddy.services;

import java.util.Collections;
import java.util.List;

import com.tripbuddy.dto.UserProfileDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tripbuddy.config.EncoderConfig;
import com.tripbuddy.dto.UserRegistrationRequest;
import com.tripbuddy.entities.RolesEntity;
import com.tripbuddy.entities.UserEntity;
import com.tripbuddy.repositories.RoleRepository;
import com.tripbuddy.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EncoderConfig passwordEncoder;

    @Transactional
    public UserEntity registerUser(UserRegistrationRequest user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("User with email already exists");
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(user.getName());
        // Encode the password
        userEntity.setPassword(passwordEncoder.passwordEncoder().encode(user.getPassword()));

        // Assign default role
        RolesEntity defaultRole = roleRepository.findByRole("USER");
        defaultRole.setUser(userEntity);
        userEntity.setRolesEntities(List.of(defaultRole));
        userEntity.setEmail(user.getEmail().toLowerCase());
        // Save the user
        return userRepository.save(userEntity);
    }

    public UserProfileDTO getUserProfile(Authentication authentication) {
        String email = authentication.getName();
        UserEntity user = userRepository.findByEmail(email);

        return UserProfileDTO.builder().email(user.getEmail()).name(user.getUsername()).build();
    }

}
