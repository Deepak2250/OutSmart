package com.tripbuddy.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginRequest {
    private String email;
    private String password;
}
