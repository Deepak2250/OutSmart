package com.tripbuddy.services;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tripbuddy.config.EncoderConfig;
import com.tripbuddy.entities.RolesEntity;
import com.tripbuddy.entities.UserEntity;
import com.tripbuddy.repositories.RoleRepository;
import com.tripbuddy.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EncoderConfig passwordEncoder;
     @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                getAuthorities(user));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(UserEntity user) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        for (RolesEntity role : user.getRolesEntities()) {
            authorities.add(new SimpleGrantedAuthority(role.getRole()));
        }
        return authorities;
    }

    @Transactional
    public UserDetails createUser(String email, String name) {
        // Create a new User entity
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(name);
        // Encode the password
        userEntity.setPassword(passwordEncoder.passwordEncoder().encode(UUID.randomUUID().toString()));

        // Assign default role
        RolesEntity defaultRole = roleRepository.findByRole("USER");
        defaultRole.setUser(userEntity);
        userEntity.setRolesEntities(List.of(defaultRole));
        userEntity.setEmail(email.toLowerCase());
        userEntity.setPassword(passwordEncoder.passwordEncoder().encode(UUID.randomUUID().toString())); // Encode the access
        userRepository.save(userEntity);                                                  // token as password

        return new org.springframework.security.core.userdetails.User(
                userEntity.getEmail(), userEntity.getPassword(), getAuthorities(userEntity));

    }


}