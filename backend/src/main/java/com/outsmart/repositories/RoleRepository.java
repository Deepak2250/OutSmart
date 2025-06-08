package com.outsmart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.outsmart.entities.RolesEntity;

public interface RoleRepository extends JpaRepository<RolesEntity, Long> {
    RolesEntity findByRole(String roleName);

    boolean existsByRole(String role);
}
