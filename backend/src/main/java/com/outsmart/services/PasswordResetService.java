package com.outsmart.services;

import com.outsmart.entities.PasswordResetOtp;
import com.outsmart.entities.UserEntity;
import com.outsmart.exceptions.InvalidOtpException;
import com.outsmart.exceptions.OtpExpiredException;
import com.outsmart.repositories.PasswordResetOtpRepository;
import com.outsmart.repositories.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class PasswordResetService {

    @Autowired
    private PasswordResetOtpRepository otpRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    @Transactional
    public String sendOtpToEmail(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        otpRepository.deleteByUser(user); // clean old OTPs

        String otp = generateOtp();

        PasswordResetOtp resetOtp = new PasswordResetOtp();
        resetOtp.setUser(user);
        resetOtp.setOtp(otp);
        resetOtp.setExpiryTime(LocalDateTime.now().plusMinutes(10));
        otpRepository.save(resetOtp);

        emailService.sendOtpEmail(email, otp);
        return otp;
    }

    public boolean verifyOtpAndResetPassword(String email, String otp, String newPassword) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        PasswordResetOtp resetOtp = otpRepository.findByUser(user)
                .orElseThrow(() -> new InvalidOtpException("No OTP found for user"));

        if (!resetOtp.getOtp().equals(otp)) {
            throw new InvalidOtpException("Invalid OTP provided");
        }

        if (resetOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            otpRepository.deleteByUser(user);
            throw new OtpExpiredException("OTP has expired");
        }

        userRepository.updatePasswordByEmail(email, passwordEncoder.encode(newPassword));
        otpRepository.deleteByUser(user);
        return true;
    }
}
