package com.outsmart.controllers;

import com.outsmart.annotations.AdminAuditableAction;
import com.outsmart.config.EncryptionUtil;
import com.outsmart.dto.*;
import com.outsmart.entities.PlanType;
import com.outsmart.entities.TicketFilter;
import com.outsmart.entities.TicketStatus;
import com.outsmart.payload.request.*;
import com.outsmart.payload.features.PlatformStatsDto;
import com.outsmart.payload.features.ResumeUsageTimeDto;
import com.outsmart.payload.response.ApiResponse;
import com.outsmart.payload.users.UserProfileDTO;
import com.outsmart.payload.users.UserSessionDto;
import com.outsmart.payload.users.UserUpdateRequest;
import com.outsmart.services.admin.AdminService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Validated
@PreAuthorize("hasAuthority('ADMIN')")
@Slf4j
public class AdminController {

    private final AdminService adminService;
    private final EncryptionUtil encryptionUtil;

    // User Management Endpoints
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<Page<UserProfileDTO>>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserProfileDTO> users = adminService.getAllUsers(pageable);
        return ResponseEntity.ok(new ApiResponse<>("success", "Users fetched successfully", users));
    }

    @GetMapping("/users/{encryptedEmail}")
    public ResponseEntity<ApiResponse<UserProfileDTO>> getUserByEmail(@PathVariable @NotBlank String encryptedEmail) throws Exception {
        String email = encryptionUtil.decrypt(encryptedEmail);
        UserProfileDTO user = adminService.getUserByEmail(email);
        return ResponseEntity.ok(new ApiResponse<>("success", "User fetched successfully", user));
    }

    @AdminAuditableAction(action = "SUSPEND_USER", entity = "USER" , requiresCustomDetails = true)
    @PostMapping("/users/suspend")
    public ResponseEntity<ApiResponse<Void>> suspendUser(@RequestBody @Valid UserActionRequest request) throws Exception {
        String email = encryptionUtil.decrypt(request.encryptedIdentifier());
        adminService.suspendUser(email, request.reason());
        return ResponseEntity.ok(new ApiResponse<>("success", "User suspended successfully", null));
    }

    @AdminAuditableAction(action = "REACTIVATE_USER", entity = "USER" , requiresCustomDetails = true)
    @PostMapping("/users/reactivate")
    public ResponseEntity<ApiResponse<Void>> reactivateUser(@RequestBody @Valid UserActionRequest request) throws Exception {
        String email = encryptionUtil.decrypt(request.encryptedIdentifier());
        adminService.reactivateUser(email, request.reason());
        return ResponseEntity.ok(new ApiResponse<>("success", "User reactivated successfully", null));
    }

    @AdminAuditableAction(action = "RESET_USER_PASSWORD", entity = "USER" , requiresCustomDetails = true)
    @PostMapping("/users/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetUserPassword(@RequestBody @Valid PasswordResetRequest request) throws Exception {
        String email = encryptionUtil.decrypt(request.encryptedEmail());
        adminService.resetUserPassword(email, request.newPassword(), request.reason());
        return ResponseEntity.ok(new ApiResponse<>("success", "Password reset successfully", null));
    }

    @GetMapping("/plans")
    public ResponseEntity<ApiResponse<List<PlanDto>>> getAllPlans() {
        return ResponseEntity.ok(new ApiResponse<>("success", "Plans fetched successfully", adminService.getAllPlans()));
    }

    @AdminAuditableAction(action = "CREATE_PLAN", entity = "PLAN" , requiresCustomDetails = true)
    @PostMapping("/plans")
    public ResponseEntity<ApiResponse<PlanDto>> createPlan(@RequestBody @Valid AdminPlanRequest createPlanRequest) {
        PlanDto created = adminService.createPlan(createPlanRequest.planDto(), createPlanRequest.reason());
        return ResponseEntity.ok(new ApiResponse<>("success", "Plan created successfully", created));
    }

    @AdminAuditableAction(action = "UPDATE_PLAN", entity = "PLAN" , requiresCustomDetails = true)
    @PutMapping("/plans")
    public ResponseEntity<ApiResponse<PlanDto>> updatePlan(@RequestParam PlanType type, @RequestBody @Valid AdminPlanRequest adminPlanRequest) {
        PlanDto updatedPlan = adminService.updatePlan(type, adminPlanRequest.planDto(), adminPlanRequest.reason());
        return ResponseEntity.ok(new ApiResponse<>("success", "Plan updated successfully", updatedPlan));
    }

    @AdminAuditableAction(action = "DELETE_PLAN", entity = "PLAN" , requiresCustomDetails = true)
    @DeleteMapping("/plans")
    public ResponseEntity<ApiResponse<Void>> deletePlan(@RequestParam PlanType type, @RequestBody @NotBlank String reason) {
        adminService.deletePlan(type, reason);
        return ResponseEntity.ok(new ApiResponse<>("success", "Plan deleted successfully", null));
    }

    @AdminAuditableAction(action = "ASSIGN_PLAN_TO_USER", entity = "USER" , requiresCustomDetails = true)
    @PostMapping("/users/plans/assign")
    public ResponseEntity<ApiResponse<Void>> assignPlanToUser(@RequestBody @Valid UserPlanRequest request) throws Exception {
        String email = encryptionUtil.decrypt(request.encryptedEmail());
        adminService.assignPlanToUser(email, request.planType(), request.reason());
        return ResponseEntity.ok(new ApiResponse<>("success", "Plan assigned successfully", null));
    }


    @AdminAuditableAction(action = "REVOKE_PLAN_FROM_USER", entity = "PLAN" , requiresCustomDetails = true)
    @PostMapping("/users/plans/revoke")
    public ResponseEntity<ApiResponse<Void>> revokePlanFromUser(@RequestBody @Valid UserPlanRequest request) throws Exception {
        String email = encryptionUtil.decrypt(request.encryptedEmail());
        adminService.revokePlanFromUser(email, request.planType(), request.reason());
        return ResponseEntity.ok(new ApiResponse<>("success", "Plan revoked successfully", null));
    }

    @GetMapping("/analytics/platform-stats")
    public ResponseEntity<ApiResponse<PlatformStatsDto>> getPlatformStats(@RequestParam @Positive Long days) {
        return ResponseEntity.ok(new ApiResponse<>("success", "Platform stats fetched successfully", adminService.getPlatFormStats(days)));
    }

    @GetMapping("/analytics/active-users")
    public ResponseEntity<ApiResponse<Page<UserUsageProjection>>> getMostActiveUsers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(new ApiResponse<>("success", "Most active users fetched successfully", adminService.getMostActiveUsers(pageable)));
    }

    @GetMapping("/analytics/daily-usage")
    public ResponseEntity<ApiResponse<List<DailyUsageDto>>> getDailyActiveUsers(@RequestParam @Positive int days) {
        return ResponseEntity.ok(new ApiResponse<>("success", "Daily active users fetched successfully", adminService.getDailyActiveUsers(days)));
    }

    @GetMapping("/analytics/monthly-resume-analyses")
    public ResponseEntity<ApiResponse<List<ResumeUsageTimeDto>>> getMonthlyResumeAnalyses(@RequestParam @Positive int months) {
        return ResponseEntity.ok(new ApiResponse<>("success", "Monthly resume analyses fetched successfully", adminService.getMonthlyResumeAnalyses(months)));
    }

    @GetMapping("/support-tickets")
    public ResponseEntity<ApiResponse<Page<SupportTicketDto>>> getAllSupportTickets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) TicketFilter filter) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(new ApiResponse<>("success", "Support tickets fetched successfully", adminService.getAllSupportTickets(pageable, filter)));
    }

    @GetMapping("/support-tickets/user/{encryptedEmail}")
    public ResponseEntity<ApiResponse<List<SupportTicketDto>>> getTicketByEmail(@PathVariable @NotBlank String encryptedEmail) throws Exception {
        String email = encryptionUtil.decrypt(encryptedEmail);
        return ResponseEntity.ok(new ApiResponse<>("success", "User tickets fetched successfully", adminService.getTicketByEmail(email)));
    }

    @AdminAuditableAction(action = "RESPOND_TO_TICKET", entity = "SUPPORT" , requiresCustomDetails = true)
    @PostMapping("/support-tickets/{id}/respond")
    public ResponseEntity<ApiResponse<Void>> respondToTicket(@PathVariable @NotNull Long id, @RequestParam @NotNull TicketStatus ticketStatus) {
        adminService.respondToTicket(id, ticketStatus);
        return ResponseEntity.ok(new ApiResponse<>("success", "Response recorded successfully", null));
    }


    @AdminAuditableAction(action = "IMPERSONATE_USER", entity = "USER" , requiresCustomDetails = true)
    @PostMapping("/users/impersonate")
    public ResponseEntity<ApiResponse<UserSessionDto>> impersonateUser(@RequestBody @Valid UserIdentifierRequest request) throws Exception {
        String email = encryptionUtil.decrypt(request.encryptedEmail());
        return ResponseEntity.ok(new ApiResponse<>("success", "User impersonated successfully", adminService.impersonateUser(email , request.reason())));
    }

    @GetMapping("/logs")
    public ResponseEntity<ApiResponse<List<AdminActionLogDto>>> getAdminLogs() {
        return ResponseEntity.ok(new ApiResponse<>("success", "Admin logs fetched successfully", adminService.getAdminLogs()));
    }

    @AdminAuditableAction(action = "ASSIGN_USER_ROLE", entity = "USER" , requiresCustomDetails = true) // Logs the role-change action for auditing
    @PostMapping("/users/assign-role")
    public ResponseEntity<ApiResponse<String>> assignRole(@RequestBody UserRoleRequest request) throws Exception {
            String email = encryptionUtil.decrypt(request.encryptedEmail());
            adminService.assignRoleToUser(email, request.role() , request.reason());
            return ResponseEntity.ok(new ApiResponse<>("success", "Role assigned successfully" ,null ));

    }

    @AdminAuditableAction(action = "REMOVE_USER_ROLE", entity = "USER" , requiresCustomDetails = true) // Logs the role-change action for auditing
    @PostMapping("/users/remove-role")
    public ResponseEntity<ApiResponse<String>> removeRole(@RequestBody UserRoleRequest request) throws Exception {
        String email = encryptionUtil.decrypt(request.encryptedEmail());
        adminService.removeRoleFromUser(email, request.role() , request.reason());
        return ResponseEntity.ok(new ApiResponse<>("success", "Role removed successfully" ,null ));

    }

    @PostMapping("/roles")
    public ResponseEntity<ApiResponse<RoleResponse>> createRole(@RequestBody CreateRoleRequest request) {
        RoleResponse role = adminService.createNewRole(request);
        return ResponseEntity.ok(new ApiResponse<>("success", "Role created successfully", role));
    }

    @AdminAuditableAction(
            action = "BULK_DELETE_ENTITIES",
            entity = "GENERIC",
            requiresCustomDetails = true
    )
    @DeleteMapping("/bulk-delete")
    public ResponseEntity<ApiResponse<Void>> bulkDelete(
            @RequestBody @Valid BulkDeleteRequest request) {

        adminService.bulkDelete(request.entityTypes() , request.reason());

        return ResponseEntity.ok(
                new ApiResponse<>("success", "Entities deleted successfully", null)
        );
    }

}