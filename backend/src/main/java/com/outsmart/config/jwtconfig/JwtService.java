package com.outsmart.config.jwtconfig;

import com.outsmart.entities.UserEntity;
import com.outsmart.repositories.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import com.outsmart.exceptions.WrongAuthenticationCredentials;

import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
@Slf4j
public class JwtService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public String authentication(String email, String password) {
        try {
            if (password != null) {
                // Standard authentication
                org.springframework.security.core.Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                log.info("Authorities at token generation: {}", userDetails.getAuthorities());
                String jwtToken = jwtUtil.generateToken(userDetails);
                 Optional<UserEntity> user = userRepository.findByEmail(userDetails.getUsername());
                 if (user.isPresent()){
                     user.get().setLastLoginAt(LocalDateTime.now());
                     userRepository.save(user.get());
                 }

                if (authentication.isAuthenticated()) {
                    return jwtToken;
                } else {
                    throw new WrongAuthenticationCredentials("Please sign up first!");
                }
            } else {
                // OAuth2 login, no password required
                UserDetails userDetails = userDetailsService.loadUserByUsername(email); // No need to check for the password of the user directly give the access 
                if (userDetails == null) {
                    throw new RuntimeException("User not found for email: " + email);
                }
                Optional<UserEntity> user = userRepository.findByEmail(userDetails.getUsername());
                if (user.isPresent()){
                    user.get().setLastLoginAt(LocalDateTime.now());
                    userRepository.save(user.get());
                }
                // Directly generate JWT
                log.info("Authorities at token generation: {}", userDetails.getAuthorities());
                return jwtUtil.generateToken(userDetails);
            }
        } catch (Exception e) {
            throw new RuntimeException("Something might be wrong in email or password", e);
        }
    }

}
