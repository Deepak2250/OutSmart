package com.outsmart.entities;
import java.time.LocalDateTime;

public record TicketFilter(TicketStatus status, LocalDateTime fromDate, LocalDateTime toDate) {}
