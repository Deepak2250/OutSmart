package com.outsmart.repositories.user;

import com.outsmart.audit.UserAuditLog;
import com.outsmart.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserAuditLogRepository extends JpaRepository<UserAuditLog, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM UserAuditLog u WHERE u.timestamp < :time")
    int deleteByTimestampBefore(@Param("time") LocalDateTime time);

    List<UserAuditLog> findTop10ByEmailOrderByTimestampDesc(String email);
}
