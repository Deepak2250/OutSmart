package com.outsmart.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginRequest {
    private String email;
    private String password;
}
