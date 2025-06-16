package com.outsmart.repositories.user;

import com.outsmart.entities.UserEntity;
import com.outsmart.entities.UserPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserPlanRepository extends JpaRepository<UserPlan, Long> {

    @Modifying
    @Query("UPDATE UserPlan up SET up.isActive = false WHERE up.user = :user AND up.isActive = true")
    void deactivateAllActivePlans(@Param("user") UserEntity user);
    @Query("SELECT SUM(up.totalUsed) FROM UserPlan up WHERE up.purchasedAt >= :since")
    Long sumResumeAnalysesSince(@Param("since") LocalDateTime since);

    @Query("""
    SELECT FUNCTION('DATE_FORMAT', up.purchasedAt, '%Y-%m'), SUM(up.totalUsed)
    FROM UserPlan up
    WHERE up.purchasedAt >= :since
    GROUP BY FUNCTION('DATE_FORMAT', up.purchasedAt, '%Y-%m')
    ORDER BY FUNCTION('DATE_FORMAT', up.purchasedAt, '%Y-%m')
    """)
    List<Object[]> getMonthlyAnalysesSince(@Param("since") LocalDateTime since);






}