package com.outsmart.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserFileDto {
    private String fileName;
    private String fileType;
    private long fileSize;
    private LocalDateTime uploadedAt;
}

