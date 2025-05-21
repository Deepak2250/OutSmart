package com.tripbuddy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripbuddy.entities.RolesEntity;

public interface RoleRepository extends JpaRepository<RolesEntity, Long> {
    RolesEntity findByRole(String roleName);

    boolean existsByRole(String role);
}
