package com.outsmart.audit;

import com.outsmart.entities.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_audit_logs")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserAuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "action" , nullable = false)
    private String action;

    @Column(name = "time_stamp" , nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "ip_address" , nullable = false)
    private String ipAddress;

    @Column(name = "user_agent" , nullable = false)
    private String userAgent;

    @Column(name = "user_email" , nullable = false)
    private String email;

    @Column(columnDefinition = "TEXT")
    private String errorDetails;  // store exception stacktrace/message if any


}
