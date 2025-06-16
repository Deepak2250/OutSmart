package com.outsmart.entities;

import jakarta.persistence.Table;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "support_ticket")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SupportTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TicketStatus status = TicketStatus.OPEN;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime respondedAt;

    @Version
    private Integer version;

    /** What happens with @Version and optimistic locking:
    * Let’s say two admins fetch the same ticket:

    * Admin A reads ticket version 1.

    * Admin B reads ticket version 1.

    * Admin A modifies and saves → version becomes 2.

    * Admin B tries to save → JPA will run:

     sql
     Copy
     Edit
     UPDATE support_ticket SET ... WHERE id = ? AND version = 1
     But version is now 2, so no row is affected → JPA throws ObjectOptimisticLockingFailureException.

     💥 This exception is only thrown at commit time, so you must be inside a transaction.

     ✅ So: Why You Must Use @Transactional
     Because without @Transactional, changes may be flushed too early or too late, and JPA might not properly check the version and enforce consistency.**/
}