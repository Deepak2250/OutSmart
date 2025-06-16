package com.outsmart.dto;

import com.outsmart.audit.AdminActionLog;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AdminActionLogDto {
    private Long id;
    private String adminEmail;
    private String action;
   private String targetUser;
   private String targetEntity;
   private LocalDateTime createdAt;
   private String ipAddress;

    public static AdminActionLogDto fromEntity(AdminActionLog log) {
        return AdminActionLogDto.builder()
                .id(log.getId())
                .adminEmail(log.getAdminEmail())
                .action(log.getAction())
                .createdAt(log.getCreatedAt())
                .ipAddress(log.getIpAddress())
                .targetEntity(log.getTargetEntity())
                .targetUser(log.getTargetEntityName())
                .build();
    }

}
