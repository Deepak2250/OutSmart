package com.outsmart.services.user;

import com.outsmart.repositories.user.UserAuditLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserAuditCleanUpFunction {

    private final UserAuditLogRepository userAuditLogRepository;

    @Scheduled(cron = "0 0 3 * * ?") // Every day at 3 AM
    @Transactional
    public void deleteOldLogs() {
        try {
            LocalDateTime cutoffDate = LocalDateTime.now().minusWeeks(2);
            int deletedCount = userAuditLogRepository.deleteByTimestampBefore(cutoffDate);

            if (deletedCount > 0) {
                log.info("Deleted {} old audit logs older than {}", deletedCount, cutoffDate);
            }
        } catch (Exception e) {
            log.error("Failed to clean up old audit logs", e);
            // Consider adding alerting/notification here for production
        }
    }
}
