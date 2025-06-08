package com.outsmart.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.service.annotation.GetExchange;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OtpVerificationRequest {
    private String email;
    private String otp;
    private String newPassword;
}

