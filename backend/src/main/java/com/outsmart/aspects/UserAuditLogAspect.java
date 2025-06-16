package com.outsmart.aspects;

import com.outsmart.annotations.UserAuditableAction;
import com.outsmart.config.jwtconfig.JwtUtil;
import com.outsmart.payload.users.UserLoginRequest;
import com.outsmart.payload.users.UserRegistrationRequest;
import com.outsmart.services.user.UserAuditLogService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;

@Aspect
@Component
@RequiredArgsConstructor
@Slf4j
public class UserAuditLogAspect {

    private final UserAuditLogService userAuditLogService;
    private final JwtUtil jwtUtil;

    @Around("@annotation(auditable)")
    public Object logUserActions(ProceedingJoinPoint joinPoint, UserAuditableAction auditable) throws Throwable {
        HttpServletRequest request = getCurrentRequest();
        String ip = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");
        String action = auditable.action();

        Object result = joinPoint.proceed();

        if ("LOGIN".equals(action) || "REGISTER".equals(action) || "LOGIN_GOOGLE".equals(action) || "LOGIN_GITHUB".equals(action)) {
            handleAudit(result, action, ip, userAgent);
        } else {
            handleStandardAudit(action, ip, userAgent);
        }

        return result;
    }

    @AfterThrowing(pointcut = "@annotation(auditable)", throwing = "ex")
    public void logUserActionFailure(JoinPoint joinPoint, UserAuditableAction auditable, Throwable ex) {
        try {
            HttpServletRequest request = getCurrentRequest();
            String email = Optional.ofNullable(extractEmailFromRequestBody(joinPoint))
                    .orElseGet(this::getCurrentUsername);

            userAuditLogService.logFailure(
                    auditable.action(),
                    email,
                    request.getRemoteAddr(),
                    request.getHeader("User-Agent"),
                    ex
            );
        } catch (Exception e) {
            log.error("Failed to log audit failure", e);
        }
    }

    private void handleAudit(Object result, String action, String ip, String userAgent) {

        String username = null;
        try {
            if (result instanceof ResponseEntity<?> responseEntity) {
                String authHeader = responseEntity.getHeaders().getFirst("Authorization");
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                     username = jwtUtil.extractUsername(authHeader.substring(7));
                    userAuditLogService.log(action, username, ip, userAgent, null); // No exception for success case
                }
            }
        } catch (Exception e) {
            log.error("Failed to handle audit for action: {}", action, e);
            userAuditLogService.log(action, username, ip, userAgent, e);
        }
    }

    private void handleStandardAudit(String action, String ip, String userAgent) {
        String username = getCurrentUsername();

        try {
            if (!"anonymous".equals(username)) {
                userAuditLogService.log(action, username, ip, userAgent , null);
            }
        }
        catch (Exception e){
            userAuditLogService.log(action, username, ip, userAgent , e);
        }
    }

    private String getCurrentUsername() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .filter(Authentication::isAuthenticated)
                .map(Authentication::getName)
                .orElse("anonymous");
    }

    private HttpServletRequest getCurrentRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }
    private String extractEmailFromRequestBody(JoinPoint joinPoint) {
        for (Object arg : joinPoint.getArgs()) {
            if (arg instanceof UserLoginRequest) {
                return ((UserLoginRequest) arg).getEmail();
            }
            if (arg instanceof UserRegistrationRequest){
                return ((UserRegistrationRequest) arg).getEmail();
            }
        }
        return "unknown";
    }
}