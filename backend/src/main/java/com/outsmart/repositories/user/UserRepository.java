package com.outsmart.repositories.user;


import com.outsmart.dto.UserUsageProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.outsmart.entities.UserEntity;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByEmail(String email);
    @Query("SELECT u FROM UserEntity u JOIN FETCH u.rolesEntities WHERE u.email = :email")
    UserEntity findByEmailWithRoles(@Param("email") String email);

    @Modifying
    @Transactional
    @Query("UPDATE UserEntity u SET u.password = :password WHERE u.email = :email")
    void updatePasswordByEmail(String email, String password);

    boolean existsByEmail(String email);
    @Query("SELECT COUNT(u) FROM UserEntity u WHERE u.lastLoginAt >= :since")
    Long countActiveUsersSince(@Param("since") LocalDateTime since);

    @Query("SELECT DATE(u.lastLoginAt), COUNT(u) FROM UserEntity u " +
            "WHERE u.lastLoginAt >= :since GROUP BY DATE(u.lastLoginAt) ORDER BY DATE(u.lastLoginAt)")
    List<Object[]> getDailyActiveUsers(@Param("since") LocalDateTime since);

    @Query("SELECT COUNT(u) FROM UserEntity u WHERE u.createdAt >= :since")
    Long countNewUsersSince(@Param("since") LocalDateTime since);

    long countByLastLoginAtBetween(LocalDateTime start, LocalDateTime end);

    @Query("""
    SELECT u.username AS username, u.email AS email,
           SUM(up.totalUsed) AS totalUsed, MAX(p.name) AS planName
    FROM UserEntity u
    JOIN u.plans up
    JOIN up.plan p
    GROUP BY u.username, u.email
    ORDER BY SUM(up.totalUsed) DESC
    """)
    Page<UserUsageProjection> findTopActiveUsers(Pageable pageable);






}
