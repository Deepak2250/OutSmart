package com.outsmart.dto;

import com.outsmart.entities.SupportTicket;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SupportTicketDto {
    private Long id;
   private String userEmail;
   private String subject;
   private String message;
   private String status;
   private LocalDateTime createdAt;
   private LocalDateTime respondedAt;

   public static SupportTicketDto fromEntity(SupportTicket ticket) {
      return new SupportTicketDto(
              ticket.getId(),
              ticket.getUserEmail(),
              ticket.getSubject(),
              ticket.getMessage(),
              ticket.getStatus().name(),
              ticket.getCreatedAt(),
              ticket.getRespondedAt()
      );
   }
}
