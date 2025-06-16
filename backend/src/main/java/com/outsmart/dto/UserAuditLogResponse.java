package com.outsmart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserAuditLogResponse {
    private String action;
    private String timeAgo;
}
