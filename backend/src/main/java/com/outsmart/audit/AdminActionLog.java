package com.outsmart.audit;

import com.outsmart.entities.UserEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// AdminActionLog.java
@Entity
@Table(name = "admin_action_log")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AdminActionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "admin_email")
    private String adminEmail;

    @Column(name = "target_user")
    private String targetEntity; // USER , PLAN etc;

    private String targetEntityName;

    private String action;

    @Column(columnDefinition = "TEXT")
    private String actionDetails;

    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String ipAddress;

    @Column(name = "error_details")
    private String errorDetails;
}
