package com.outsmart.aspects;

import com.outsmart.annotations.AdminAuditableAction;
import com.outsmart.audit.AdminActionLog;
import com.outsmart.audit.context.AdminAuditDetailsContext;
import com.outsmart.repositories.admin.AdminActionLogRepository;
import com.outsmart.services.admin.AdminAuditLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;
import java.util.Optional;


/**When thread safety becomes critical (i.e., in current AdminAuditLogAspect):
You're now using an AOP aspect that:
.Reads from a ThreadLocal context (AuditDetailContext) to pull dynamic values
 (like description, targetDetails)
populated somewhere else during the request.
.If you log asynchronously in a new thread, and that new thread doesn't inherit
the thread-local context, you'll get null or wrong data.**/


/**If you're logging something that depends on context set in one place
 and read in another (like in AOP) and also use @Async, you must ensure
 thread safety using InheritableThreadLocal.
But if your method doesn’t rely on shared context, and you're passing everything
explicitly, then ThreadLocal is unnecessary — even with @Async.**/
@Aspect
@Component
@RequiredArgsConstructor
@Slf4j
public class AdminAuditLogAspect {
    private final AdminActionLogRepository logRepository;
    private final AdminAuditDetailsContext auditDetailContext; // Thread-local holder
    private final AdminAuditLogService adminAuditLogService;

    @Around("@annotation(adminAuditableAction)")
    public Object logAdminAction(ProceedingJoinPoint joinPoint,
                                 AdminAuditableAction adminAuditableAction) throws Throwable {
        log.debug("Starting audit for action: {}", adminAuditableAction.action());
        AdminActionLog adminActionLog = new AdminActionLog();
        adminActionLog.setAdminEmail(getCurrentAdminEmail());
        adminActionLog.setTargetEntity(adminAuditableAction.entity());
        adminActionLog.setAction(adminAuditableAction.action());
        adminActionLog.setCreatedAt(LocalDateTime.now());
        adminActionLog.setIpAddress(resolveIp());

        try {
            Object result = joinPoint.proceed();

            log.debug("Method completed successfully, saving log...");

            // Method-level details if required
            if (adminAuditableAction.requiresCustomDetails()) {
                adminActionLog.setTargetEntityName(Optional.ofNullable(auditDetailContext.getTargetDetails()).orElse("N/A"));
                adminActionLog.setActionDetails(Optional.ofNullable(auditDetailContext.getDescription()).orElse("N/A"));
            }

            adminAuditLogService.saveLog(adminActionLog);
            log.debug("Log saved with ID: {}", adminActionLog.getAdminEmail());  // Ensure this prints
            return result;

        } catch (Exception e) {
            adminActionLog.setErrorDetails(e.getMessage());
            adminAuditLogService.saveLog(adminActionLog);
            log.error("Audit logging failed", e);
            throw e;
        } finally {
            auditDetailContext.clear(); // Cleanup thread-local
        }
}

    private String resolveIp() {
        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            return attributes.getRequest().getRemoteAddr();
        } catch (Exception e) {

        }
        return "UNKNOWN";
    }

    private String getCurrentAdminEmail() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .map(Authentication::getName)
                .orElse("system");
    }
}