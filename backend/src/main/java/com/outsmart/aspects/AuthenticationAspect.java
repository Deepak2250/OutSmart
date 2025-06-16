package com.outsmart.aspects;

import com.outsmart.annotations.AuthenticatedUser;
import com.outsmart.repositories.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.nio.file.AccessDeniedException;

@Aspect
@Component
@RequiredArgsConstructor
@Slf4j
public class AuthenticationAspect {

    private final UserRepository userRepository;

    @Before("@annotation(authenticatedUser)")
    public void verifyAuthentication(JoinPoint joinPoint, AuthenticatedUser authenticatedUser) throws AccessDeniedException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // Core authentication check
        if (auth == null || !auth.isAuthenticated()) {
            throw new AccessDeniedException("Authentication required");
        }
        if (authenticatedUser.checkDB()) {
            String email = auth.getName();
            if (!userRepository.existsByEmail(email)) {
                throw new UsernameNotFoundException("User not registered: " + email);
            }
        }
    }
}