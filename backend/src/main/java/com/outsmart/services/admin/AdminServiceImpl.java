package com.outsmart.services.admin;

import com.outsmart.annotations.AdminAuditableAction;
import com.outsmart.audit.context.AdminAuditDetailsContext;
import com.outsmart.config.EncoderConfig;
import com.outsmart.config.jwtconfig.JwtUtil;
import com.outsmart.dto.*;
import com.outsmart.entities.*;
import com.outsmart.exceptions.InvalidPlanTypeException;
import com.outsmart.exceptions.PlanAlreadyAssignedException;
import com.outsmart.exceptions.PlanNotExistException;
import com.outsmart.exceptions.RoleAlreadyAssignedException;
import com.outsmart.payload.features.PlatformStatsDto;
import com.outsmart.payload.features.ResumeUsageTimeDto;
import com.outsmart.payload.request.CreateRoleRequest;
import com.outsmart.payload.request.RoleResponse;
import com.outsmart.payload.users.UserProfileDTO;
import com.outsmart.payload.users.UserSessionDto;
import com.outsmart.repositories.admin.AdminActionLogRepository;
import com.outsmart.repositories.features.SupportTicketRepository;
import com.outsmart.repositories.user.*;
import com.outsmart.services.user.UserDetailsServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.OptimisticLockException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.relation.RoleNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    /**private final FeatureFlagRepository featureFlagRepository;**/
    private final SupportTicketRepository supportTicketRepository;
    private final AdminActionLogRepository adminActionLogRepository;
    //private final UserFileRepository userFileRepository;
    private final AdminAuditDetailsContext auditDetailContext;
    private final EncoderConfig encoderConfig;
    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;
    private final RoleRepository roleRepository;
    private final UserAuditLogRepository userAuditLogRepository;
    private final PasswordResetOtpRepository passwordResetOtpRepository;
    private final UserPlanRepository userPlanRepository;
    @Override
    public Page<UserProfileDTO> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(UserProfileDTO::fromEntity);
    }

    @Override
    public UserProfileDTO getUserByEmail(String email) {
        return userRepository.findByEmail(email).map(UserProfileDTO::fromEntity).orElse(null);
    }
    @Override
    @Transactional
    public void suspendUser(String email, String reason) {
    UserEntity user = userRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("NO User Found"));
            user.setIsSuspended(true);
            auditDetailContext.setTargetDetails(email);
            auditDetailContext.setDescription(reason);
            userRepository.save(user);
    }

    @Override
    @Transactional
    public void reactivateUser(String email , String reason) {
        userRepository.findByEmail(email).ifPresent(user -> {
            auditDetailContext.setTargetDetails(email);
            auditDetailContext.setDescription(reason);
            user.setIsSuspended(false);
            userRepository.save(user);
        });
    }

    @Override
    @Transactional
    public void resetUserPassword(String email , String password , String reason) {
        userRepository.findByEmail(email).ifPresent(user -> {
            user.setPassword(encoderConfig.passwordEncoder().encode(password)); // Use hashed password in production
            auditDetailContext.setDescription(reason);
            auditDetailContext.setTargetDetails(email);
            userRepository.save(user);
        });
    }

   /** @Override
    @AdminAuditableAction(action = "SEND_VERIFICATION_EMAIL", entity = "USER")
    public void sendEmail(String email) {
        // Logic to send email here
    }**/


    /**Plans Management**/
    @Override
    public List<PlanDto> getAllPlans() {
        return planRepository.findAll().stream().map(PlanDto::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PlanDto createPlan(PlanDto planDto, String reason) {
        try{
            PlanDto planDto1 = PlanDto.fromEntity(planRepository.save(planDto.toEntity()));
            auditDetailContext.setDescription(reason);
            return planDto1;
        }
        catch (DataIntegrityViolationException e){
            throw new InvalidPlanTypeException(planDto.getName().toString());
        }

    }

    @Override
    @Transactional
    public PlanDto updatePlan(PlanType type, PlanDto planDto, String reason) {
        return planRepository.findByName(type).map(existing -> {
            boolean changed = false;

            if (planDto.getName() != null && !Objects.equals(existing.getName(), planDto.getName())) {
                existing.setName(planDto.getName());
                existing.setUpdatedAt(LocalDateTime.now());
                changed = true;
            }

            if (planDto.getPrice() != null && !Objects.equals(existing.getPrice(), planDto.getPrice())) {
                existing.setPrice(planDto.getPrice());
                existing.setUpdatedAt(LocalDateTime.now());
                changed = true;
            }

            if (planDto.getIsActivePlan() != null && !Objects.equals(existing.getIsActivePlan(), planDto.getIsActivePlan())) {
                existing.setIsActivePlan(planDto.getIsActivePlan());
                existing.setUpdatedAt(LocalDateTime.now());
                changed = true;
            }

            if (planDto.getDescription() != null && !planDto.getDescription().isBlank()
                    && !Objects.equals(existing.getDescription(), planDto.getDescription())) {
                existing.setDescription(planDto.getDescription());
                existing.setUpdatedAt(LocalDateTime.now());
                changed = true;
            }

            if (planDto.getUploadLimit() != null && !Objects.equals(existing.getUploadLimit(), planDto.getUploadLimit())) {
                existing.setUploadLimit(planDto.getUploadLimit());
                existing.setUpdatedAt(LocalDateTime.now());
                changed = true;
            }

            if (changed) {
                auditDetailContext.setDescription(reason);
                return PlanDto.fromEntity(planRepository.save(existing));
            }
            auditDetailContext.setDescription(reason);
            return PlanDto.fromEntity(existing);
        }).orElse(null);
    }


    @Override
    public void deletePlan(PlanType planType, String reason) {
        planRepository.deleteByName(planType);
        auditDetailContext.setTargetDetails(planType.name());
        auditDetailContext.setDescription(reason);
    }

    @Override
    @Transactional
    public void assignPlanToUser(String email, PlanType type , String reason) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(email);
        Optional<Plan> planOpt = planRepository.findByName(type);


        if (userOpt.isEmpty()) {
           throw new UsernameNotFoundException("No User Found with this name : " +email);
        }
        if (planOpt.isEmpty()) {
            throw new IllegalArgumentException("Plan not found with ID: " + type.name());
        }

        UserEntity user = userOpt.get();
        Plan plan = planOpt.get();
        boolean hasActivePlan = user.getPlans().stream()
                .anyMatch(up -> up.getPlan().getName().equals(plan.getName()) && Boolean.TRUE.equals(up.getIsActive()));

        if (hasActivePlan) {
            throw new RuntimeException("User already has this plan active: " + plan.getName());
        }

        UserPlan userPlan = new UserPlan();
        userPlan.setUser(user);
        userPlan.setPlan(plan);
        userPlan.setPurchasedAt(LocalDateTime.now());
        userPlan.setIsActive(true);
        userPlan.setTotalUsed(0);
        if (user.getPlans() == null) {
            user.setPlans(new HashSet<>());
        }
        user.getPlans().add(userPlan);
        userRepository.save(user);
        auditDetailContext.setDescription(reason);
        auditDetailContext.setTargetDetails(email);
    }


    @Override
    @Transactional
    public void revokePlanFromUser(String email, PlanType type , String reason) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(email);
        Optional<Plan> planOpt = planRepository.findByName(type);

        if (userOpt.isEmpty()) {
            throw new UsernameNotFoundException("User not found with ID: " + email);
        }
        if (planOpt.isEmpty()) {
            throw new IllegalArgumentException("Plan not found with ID: " + type.name());
        }



        UserEntity user = userOpt.get();
        Plan plan = planOpt.get();
        Optional<UserPlan> activePlanOpt = user.getPlans().stream()
                .filter(up -> up.getPlan().getName().equals(plan.getName()) && Boolean.TRUE.equals(up.getIsActive()))
                .findFirst();

        if (activePlanOpt.isEmpty()) {
            throw new PlanNotExistException("User don't have the plan: " + plan.getName());
        }

        if (user.getPlans() != null) {
            user.getPlans().stream()
                    .filter(up -> up.getPlan().getName().equals(plan.getName()) && Boolean.TRUE.equals(up.getIsActive()))
                    .forEach(up -> {
                        up.setIsActive(false);
                        up.setDeactivatedAt(LocalDateTime.now());
                    });

            userRepository.save(user);
            auditDetailContext.setTargetDetails(email);
            auditDetailContext.setDescription(reason);
        }
    }

    @Override
    public PlatformStatsDto getPlatFormStats(Long days) {
      Long totalUsers = userRepository.countActiveUsersSince(LocalDateTime.now().minusDays(days));
      Long totalResumeAnalyses = userPlanRepository.sumResumeAnalysesSince(LocalDateTime.now().minusDays(days));
        return new PlatformStatsDto(totalUsers , totalResumeAnalyses);
    }

    @Override
    public Page<UserUsageProjection> getMostActiveUsers(Pageable pageable) {
        return userRepository.findTopActiveUsers(pageable);
    }

    @Override
    public List<DailyUsageDto> getDailyActiveUsers(int days) {
        return getDailyActiveUsersInRange(days);
    }

    @Override
    public List<ResumeUsageTimeDto> getMonthlyResumeAnalyses(int months) {
        LocalDateTime since = LocalDateTime.now().minusMonths(months);
        return userPlanRepository.getMonthlyAnalysesSince(since).stream()
                .map(r -> new ResumeUsageTimeDto(r[0].toString(), (Long) r[1]))
                .collect(Collectors.toList());
    }

  /**  @Override
    @AdminAuditableAction(action = "EXPORT_USAGE_REPORT", entity = "ANALYTICS")
    public ByteArrayOutputStream exportUsageReport() {
        return new ByteArrayOutputStream(); // Mocked implementation
    }**/

   /*** @Override
    @AdminAuditableAction(action = "GET_ALL_FEATURE_FLAGS", entity = "FEATURE_FLAG")
    public List<FeatureFlagDto> getAllFeatureFlags() {
        return featureFlagRepository.findAll().stream().map(FeatureFlagDto::fromEntity).collect(Collectors.toList());
    }**/

   /** @Override
    @AdminAuditableAction(action = "TOGGLE_FEATURE_FLAG", entity = "FEATURE_FLAG")
    public FeatureFlagDto toggleFeatureFlag(Long featureId, boolean enabled) {
        return featureFlagRepository.findById(featureId).map(flag -> {
            flag.setEnabled(enabled);
            return FeatureFlagDto.fromEntity(featureFlagRepository.save(flag));
        }).orElse(null);
    }**/

    /**@Override
    @AdminAuditableAction(action = "TOGGLE_FEATURE_FOR_USER", entity = "FEATURE_FLAG")
    public void toggleFeatureForUser(Long userId, Long featureId, boolean enabled) {
        // Implementation logic to toggle user feature flag
    }**/

    /**@Override
    @AdminAuditableAction(action = "TOGGLE_FEATURE_FOR_PLAN", entity = "FEATURE_FLAG")
    public void toggleFeatureForPlan(Long planId, Long featureId, boolean enabled) {
        // Implementation logic to toggle feature for plan
    }**/

    @Override
    public Page<SupportTicketDto> getAllSupportTickets(Pageable pageable, TicketFilter filter) {
        Page<SupportTicket> page;

        LocalDateTime fromDate = filter.fromDate();
        LocalDateTime toDate = filter.toDate();
        TicketStatus status = filter.status();

        if (status != null && fromDate != null && toDate != null) {
            page = supportTicketRepository.findByStatusAndCreatedAtBetween(status, fromDate, toDate, pageable);
        } else if (fromDate != null && toDate != null) {
            page = supportTicketRepository.findByCreatedAtBetween(fromDate, toDate, pageable);
        } else if (status != null && fromDate != null) {
            page = supportTicketRepository.findByStatusAndCreatedAtAfter(status, fromDate, pageable);
        } else if (status != null) {
            page = supportTicketRepository.findByStatus(status, pageable);
        } else if (fromDate != null) {
            page = supportTicketRepository.findByCreatedAtAfter(fromDate, pageable);
        } else {
            page = supportTicketRepository.findAll(pageable);
        }

        return page.map(SupportTicketDto::fromEntity);
    }


    @Override
    public List<SupportTicketDto> getTicketByEmail(String email) {
       List<SupportTicketDto> supportTicketDtoList = supportTicketRepository.findAllByUserEmail(email)
                .stream()
                .map(SupportTicketDto::fromEntity)
                .toList();
       return Optional.of(supportTicketDtoList).orElse(new ArrayList<>());
    }


    /**@Transactional: required so that the version check (via @Version) works at transaction commit time.
     @Version: ensures optimistic locking, preventing simultaneous admin overwrites.**/
    @Override
    @Transactional /** Ensures that all operations below happen in a single DB transaction**/
    public void respondToTicket(Long id , TicketStatus ticketStatus) {

        try {
            SupportTicket ticket = supportTicketRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Ticket not found with id: " + id));

            // Optionally mark the ticket as closed after a response
            ticket.setStatus(ticketStatus);
            ticket.setRespondedAt(LocalDateTime.now());
            // Save the updated ticket entity
            // This is where optimistic locking kicks in:
            // JPA will include the version in the UPDATE query.
            // If another admin already modified the ticket (version changed),
            // this will throw ObjectOptimisticLockingFailureException.
            supportTicketRepository.save(ticket);
            auditDetailContext.setDescription("Made Decision over the ticket raised");
            auditDetailContext.setTargetDetails(ticket.getUserEmail());
        }
        catch (OptimisticLockException e){
            throw new ConcurrentModificationException("This ticket has been modified by another admin. Please refresh and try again.");
        }
    }



    @Override
    public UserSessionDto impersonateUser(String email , String reason) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());

        String accessToken = jwtUtil.generateToken(userDetails);

        Set<String> roles = user.getRolesEntities()
                .stream()
                .map(roleEntity -> roleEntity.getRole().toString())
                .collect(Collectors.toSet());
        auditDetailContext.setTargetDetails(email);
        auditDetailContext.setTargetDetails(reason);

        return UserSessionDto.builder()
                .email(user.getEmail())
                .fullName(user.getUsername())
                .role(roles)
                .accessToken(accessToken)
                .build();
    }




    @Override
    public List<AdminActionLogDto> getAdminLogs() {
        // Fetch all admin action log records from the database
        // Convert each AdminActionLog entity into a DTO for safe return
        return adminActionLogRepository.findAll().stream()
                .map(AdminActionLogDto::fromEntity) // Convert entity to DTO
                .collect(Collectors.toList()); // Return as a List
    }

    @Override
    public void assignRoleToUser(String email, String roleName , String reason) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        RolesEntity role = roleRepository.findByRole(roleName.toUpperCase())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Check if role already exists in user
        boolean hasRole = user.getRolesEntities().stream()
                .anyMatch(r -> r.getRole().equalsIgnoreCase(role.getRole()));

        if (hasRole) {
            throw new RuntimeException("User already has the role: " + roleName);
        }

        // Add and save
        user.getRolesEntities().add(role);
        userRepository.save(user);
        auditDetailContext.setTargetDetails(user.getEmail());
        auditDetailContext.setDescription(reason);
    }


    @Override
    public void removeRoleFromUser(String email, String roleName , String reason) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        RolesEntity role = roleRepository.findByRole(roleName.toUpperCase())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        boolean removed = user.getRolesEntities().removeIf(r -> r.getRole().equalsIgnoreCase(role.getRole()));

        if (!removed) {
            throw new RuntimeException("User does not have the role: " + roleName);
        }

        userRepository.save(user);
        auditDetailContext.setTargetDetails(user.getEmail());
        auditDetailContext.setDescription(reason);
    }



    @Override
    @Transactional
    public RoleResponse createNewRole(CreateRoleRequest request) {
        if (roleRepository.existsByRole(request.name().toUpperCase())) {
            throw new IllegalArgumentException("Role already exists");
        }

        RolesEntity role = new RolesEntity();
        role.setRole(request.name().toUpperCase());

        RolesEntity saved = roleRepository.save(role);

        return new RoleResponse(saved.getId(), saved.getRole());
    }


    @Override
    @Transactional
    public void bulkDelete(List<String> entityTypes, String reason) {
        if (entityTypes == null || entityTypes.isEmpty()) {
            throw new IllegalArgumentException("Entity types list cannot be empty.");
        }

        for (String entityType : entityTypes) {
            switch (entityType.toUpperCase()) {
                case "USER":
                    if ( userRepository.count() <= 0){
                        throw new EmptyStackException();
                    }
                    userRepository.deleteAll();
                    auditDetailContext.setDescription("Deleted all users: " + reason);
                    break;

                case "SUPPORT_TICKET":
                    if ( supportTicketRepository.count() <= 0){
                        throw new EmptyStackException();
                    }
                    supportTicketRepository.deleteAll();
                    auditDetailContext.setDescription("Deleted all support tickets: " + reason);
                    break;

                case "ADMIN":
                    if ( adminActionLogRepository.count() <= 0){
                        throw new EmptyStackException();
                    }
                    adminActionLogRepository.deleteAll();
                    auditDetailContext.setDescription("Deleted all admin entities: " + reason);
                    break;

                case "USER_LOG":
                    if ( userAuditLogRepository.count() <= 0){
                        throw new EmptyStackException();
                    }
                    userAuditLogRepository.deleteAll();
                    auditDetailContext.setDescription("Deleted all user logs: " + reason);
                    break;

                case "USER_OTP":
                    if ( passwordResetOtpRepository.count() <= 0){
                        throw new EmptyStackException();
                    }
                    passwordResetOtpRepository.deleteAll();
                    auditDetailContext.setDescription("Deleted all OTPs: " + reason);
                    break;

                case "ADMIN_LOG":
                    if ( adminActionLogRepository.count() <= 0){
                        throw new EmptyStackException();
                    }
                    adminActionLogRepository.deleteAll();
                    auditDetailContext.setDescription("Deleted all admin logs: " + reason);
                    break;

                default:
                    throw new IllegalArgumentException("Unsupported entity type: " + entityType);
            }
        }
    }


    private List<DailyUsageDto> getDailyActiveUsersInRange(int days) {
        LocalDate today = LocalDate.now();
        return IntStream.rangeClosed(0, days - 1)
                .mapToObj(i -> {
                    LocalDate date = today.minusDays(i);
                    long count = userRepository.countByLastLoginAtBetween(
                            date.atStartOfDay(), date.plusDays(1).atStartOfDay()
                    );
                    return new DailyUsageDto(date, count);
                })
                .sorted(Comparator.comparing(DailyUsageDto::getDate))
                .collect(Collectors.toList());
    }

}



    /**@Override
    @AdminAuditableAction(action = "GET_USER_FILES", entity = "USER_FILE")
    public List<UserFileDto> getUserFiles(Long userId) {
        return userFileRepository.findByUserId(userId).stream().map(UserFileDto::fromEntity).collect(Collectors.toList());
    }
}**/
