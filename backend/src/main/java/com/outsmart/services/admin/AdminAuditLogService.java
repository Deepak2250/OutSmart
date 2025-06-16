package com.outsmart.services.admin;

import com.outsmart.audit.AdminActionLog;
import com.outsmart.repositories.admin.AdminActionLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminAuditLogService {

    private final AdminActionLogRepository repository;

    @Async
    public void saveLog(AdminActionLog log) {
        repository.save(log);
    }
}

