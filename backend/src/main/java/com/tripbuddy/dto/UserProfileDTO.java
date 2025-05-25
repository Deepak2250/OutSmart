package com.tripbuddy.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
public class UserProfileDTO {
    private String name;
    private String email;
}
