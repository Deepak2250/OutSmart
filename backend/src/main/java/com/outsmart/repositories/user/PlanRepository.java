package com.outsmart.repositories.user;

import com.outsmart.entities.Plan;
import com.outsmart.entities.PlanType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface PlanRepository extends JpaRepository<Plan , Long> {
    boolean existsByName(PlanType Plan);
    Optional<Plan> findByName(PlanType name);

    @Modifying
    @Transactional
    void deleteByName(PlanType planType);
}
