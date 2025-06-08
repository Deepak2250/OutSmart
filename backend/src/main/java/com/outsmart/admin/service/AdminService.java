/*package com.outsmart.admin.service;

import com.outsmart.dto.UserProfileDTO;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface AdminService {
    void deleteUser(String email);
    void suspendUser(String email);
    void reactivateUser(String email);
    void resetUserPassword(String email);
    void triggerVerificationEmail(String email);
    UserProfileDTO viewUserProfile(String email);

    // Plan And Subscription Management

    void createPlan(PlanRequest plan);
    void updatePlan(Long planId, PlanRequest plan);
    void deletePlan(Long planId);

    void assignPlanToUser(String email, Long planId);
    void revokePlanFromUser(String email, Long planId);

    List<UserPlanUsageDto> viewAllPlanUsage();

    // Analytics & Reporting

    PlatformStatsDto getPlatformUsageStats();
    List<ActiveUserDto> getMostActiveUsers();
    DailyUsageChartDto getDailyUsage();
    void exportUsageDataToCSV(); // or return InputStreamResource for file download

    // Feature Flags / A/B Testing

    void enableFeatureForUser(String email, String featureKey);
    void disableFeatureForUser(String email, String featureKey);
    void enableFeatureForPlan(String planName, String featureKey);
    void disableFeatureForPlan(String planName, String featureKey);

    //Support Tools

    List<SupportTicketDto> getSupportTickets();
    void respondToTicket(Long ticketId, String response);
    UserSessionDto impersonateUser(String email); // Read-only session context

    // Security-Sensitive Admin Features

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    void changeUserRole(String email, String newRole);

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    void bulkDeleteUsers(List<String> userEmails);

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    List<ResumeContentDto> accessUserResumes(String email);

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    void fullDatabaseExport();


    /* Admin Role Hierarchy (Use Spring Security)
ROLE_SUPPORT_ADMIN

ROLE_CONTENT_ADMIN

ROLE_OPERATIONS_ADMIN

ROLE_SUPER_ADMIN*/


