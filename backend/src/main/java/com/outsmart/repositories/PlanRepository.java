package com.outsmart.repositories;

import com.outsmart.entities.Plan;
import com.outsmart.entities.PlanType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PlanRepository extends JpaRepository<Plan , Long> {
    boolean existsByName(PlanType Plan);
    Optional<Plan> findByName(PlanType name);

}
