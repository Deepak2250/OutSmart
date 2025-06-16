package com.outsmart.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDto {
   private String email;
    private String username;
    private String role;
    private String status;
    private Long totalAnalysis;
    private String plan;
    private LocalDateTime lastLoginAt;
}
