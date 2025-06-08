package com.outsmart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.outsmart.entities.UserEntity;
import org.springframework.transaction.annotation.Transactional;

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

}
