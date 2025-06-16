package com.outsmart.repositories.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.outsmart.entities.RolesEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface RoleRepository extends JpaRepository<RolesEntity, Long> {
   Optional<RolesEntity> findByRole(String roleName);

    boolean existsByRole(String role);
}
