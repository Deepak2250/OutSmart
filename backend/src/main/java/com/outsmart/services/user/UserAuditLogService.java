package com.outsmart.services.user;

import com.outsmart.audit.UserAuditLog;
import com.outsmart.repositories.user.UserAuditLogRepository;
import com.outsmart.repositories.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserAuditLogService {

    private final UserAuditLogRepository userAuditLogRepository;
    private final UserRepository userRepository;

    @Async
    public void log(String action, String username, String ip, String userAgent , Throwable ex) {

        UserAuditLog logEntry = UserAuditLog.builder()
                .action(action)
                .email(username)
                .ipAddress(ip)
                .userAgent(userAgent)
                .timestamp(LocalDateTime.now())
                .errorDetails(ex != null ? getStackTraceAsString(ex) : null)
                .build();

        userAuditLogRepository.save(logEntry);

    }

    @Async
    public void logFailure(String action, String userName, String ip, String userAgent, Throwable ex) {
        UserAuditLog logEntry = UserAuditLog.builder()
                .action(action)
                .email(userName) // Link user if exists
                .ipAddress(ip)
                .userAgent(userAgent)
                .timestamp(LocalDateTime.now())
                .errorDetails(getStackTraceAsString(ex))
                .build();

        userAuditLogRepository.save(logEntry);
    }

    private String getStackTraceAsString(Throwable ex) {
        StringBuilder sb = new StringBuilder();

        // Add the error message and root cause
        sb.append("ERROR: ").append(ex.getMessage()).append("\n");
        sb.append("ROOT CAUSE: ").append(getRootCause(ex)).append("\n\n");

        // Add a simplified stack trace (limit depth)
        sb.append("STACK TRACE (Top 5):\n");
        Arrays.stream(ex.getStackTrace())
                .limit(5)  // Only show top 5 frames
                .forEach(frame -> sb.append("  at ").append(frame).append("\n"));

        return sb.toString();
    }

    // Helper method to get the root cause
    private String getRootCause(Throwable ex) {
        Throwable rootCause = ex;
        while (rootCause.getCause() != null) {
            rootCause = rootCause.getCause();
        }
        return rootCause.getClass().getSimpleName() + ": " + rootCause.getMessage();
    }
}