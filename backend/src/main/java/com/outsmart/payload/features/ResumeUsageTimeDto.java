package com.outsmart.payload.features;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeUsageTimeDto {
    private String dateLabel; // e.g. "2025-06-01" or "2025-06"
    private Long totalAnalyses;
}
