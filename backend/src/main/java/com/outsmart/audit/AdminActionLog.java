package com.outsmart.audit;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class AdminActionLog {
    @Id
    @GeneratedValue
    private Long id;
    private String adminEmail;
    private String actionType;
    private String description;
    private LocalDateTime timestamp;
}
