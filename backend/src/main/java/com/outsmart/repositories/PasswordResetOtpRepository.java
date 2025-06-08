package com.outsmart.repositories;

import com.outsmart.entities.PasswordResetOtp;
import com.outsmart.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface PasswordResetOtpRepository extends JpaRepository<PasswordResetOtp , Long> {
    Optional<PasswordResetOtp> findByUser(UserEntity user);
    Optional<PasswordResetOtp> findByUserAndOtp(UserEntity user, String otp);
    @Modifying
    @Transactional
    @Query("DELETE FROM PasswordResetOtp p WHERE p.user = :user")
    void deleteByUser(@Param("user") UserEntity user);

}
