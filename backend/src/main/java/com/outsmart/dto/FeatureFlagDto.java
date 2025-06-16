package com.outsmart.dto;

import lombok.Data;

@Data
public class FeatureFlagDto {
    private Long id;
   private String name;
   private String description;
   private boolean enabledGlobally;
}
