package com.outsmart.repositories;

import com.outsmart.entities.UserEntity;
import com.outsmart.entities.UserPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface UserPlanRepository extends JpaRepository<UserPlan, Long> {

    @Modifying
    @Query("UPDATE UserPlan up SET up.isActive = false WHERE up.user = :user AND up.isActive = true")
    void deactivateAllActivePlans(@Param("user") UserEntity user);


}