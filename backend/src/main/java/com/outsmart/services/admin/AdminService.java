package com.outsmart.services.admin;

import com.outsmart.annotations.AdminAuditableAction;
import com.outsmart.dto.*;
import com.outsmart.entities.PlanType;
import com.outsmart.entities.TicketFilter;
import com.outsmart.entities.TicketStatus;
import com.outsmart.payload.features.PlatformStatsDto;
import com.outsmart.payload.features.ResumeUsageTimeDto;
import com.outsmart.payload.request.CreateRoleRequest;
import com.outsmart.payload.request.RoleResponse;
import com.outsmart.payload.users.UserProfileDTO;
import com.outsmart.payload.users.UserSessionDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AdminService {
    // User Management
    Page<UserProfileDTO> getAllUsers(org.springframework.data.domain.Pageable pageable);

    UserProfileDTO getUserByEmail(String email);

    void suspendUser(String email, String reason);


    void reactivateUser(String email, String reason);


    void resetUserPassword(String email, String password, String reason);

   /** @AdminAuditableAction(action = "SEND_VERIFICATION_EMAIL", entity = "USER")
    void sendEmail(String email);**/

    // Plan Management
    List<PlanDto> getAllPlans();

    PlanDto createPlan(PlanDto planDto, String reason);


    PlanDto updatePlan(PlanType type, PlanDto planDto, String reason);


    void deletePlan(PlanType planType, String reason);
    void assignPlanToUser(String email, PlanType type , String reason);


    void revokePlanFromUser(String email, PlanType type, String reason);

    // Analytics
    PlatformStatsDto getPlatFormStats(Long days);

     Page<UserUsageProjection> getMostActiveUsers(Pageable pageable);

    List<DailyUsageDto> getDailyActiveUsers(int days);

    List<ResumeUsageTimeDto> getMonthlyResumeAnalyses(int months);

    /**ByteArrayOutputStream exportUsageReport();

    // Feature Flags
   /*** List<FeatureFlagDto> getAllFeatureFlags();
    FeatureFlagDto toggleFeatureFlag(Long featureId, boolean enabled);
    void toggleFeatureForUser(Long userId, Long featureId, boolean enabled);
    void toggleFeatureForPlan(Long planId, Long featureId, boolean enabled);**/

    // Support Tools

    Page<SupportTicketDto> getAllSupportTickets(Pageable pageable, TicketFilter filter);

    List<SupportTicketDto> getTicketByEmail(String email);


    void respondToTicket(Long id, TicketStatus ticketStatus);
    UserSessionDto impersonateUser(String email , String reason);

    // Security & Audit
    List<AdminActionLogDto> getAdminLogs();

    void assignRoleToUser(String email, String roleName , String reason);
    void removeRoleFromUser(String email, String roleName , String reason);


    RoleResponse createNewRole(CreateRoleRequest request);


    void bulkDelete(List<String> entityTypes , String reason);
    /**List<UserFileDto> getUserFiles(Long userId);**/
}


    /* Admin Role Hierarchy (Use Spring Security)
ROLE_SUPPORT_ADMIN

ROLE_CONTENT_ADMIN

ROLE_OPERATIONS_ADMIN

ROLE_SUPER_ADMIN*/


