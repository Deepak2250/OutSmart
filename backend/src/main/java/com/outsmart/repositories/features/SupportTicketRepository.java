package com.outsmart.repositories.features;

import com.outsmart.entities.SupportTicket;
import com.outsmart.entities.TicketStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {

    List<SupportTicket> findAllByUserEmail(String userEmail);

    Page<SupportTicket> findByStatus(TicketStatus status, Pageable pageable);

    Page<SupportTicket> findByCreatedAtAfter(LocalDateTime fromDate, Pageable pageable);

    Page<SupportTicket> findByCreatedAtBetween(LocalDateTime fromDate, LocalDateTime toDate, Pageable pageable);

    Page<SupportTicket> findByStatusAndCreatedAtBetween(TicketStatus status, LocalDateTime fromDate, LocalDateTime toDate, Pageable pageable);

    Page<SupportTicket> findByStatusAndCreatedAtAfter(TicketStatus status, LocalDateTime fromDate, Pageable pageable);
}

