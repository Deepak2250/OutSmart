package com.outsmart.dto;

public interface UserUsageProjection {
    String getUsername();
    String getEmail();
    Long getTotalUsed();
    String getPlanName();
}
