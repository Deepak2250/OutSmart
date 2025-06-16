package com.outsmart.services.user;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.outsmart.entities.*;
import com.outsmart.repositories.user.PlanRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.outsmart.config.EncoderConfig;
import com.outsmart.repositories.user.RoleRepository;
import com.outsmart.repositories.user.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EncoderConfig passwordEncoder;
    
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PlanRepository planRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmailWithRoles(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                getAuthorities(user)
        );
    }
   /* Hibernate uses a lazy-loading proxy (PersistentSet) for the @ManyToMany collection.

    When you iterate before it finishes loading, it causes concurrent modification.

    The fix is: eagerly load (JOIN FETCH) the roles at the time of fetching the user.*/

    private Collection<? extends GrantedAuthority> getAuthorities(UserEntity user) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        for (RolesEntity role : user.getRolesEntities()) {
            authorities.add(new SimpleGrantedAuthority(role.getRole()));
        }
        log.info("Roles found: {}",
                user.getRolesEntities().stream()
                        .map(RolesEntity::getRole)
                        .collect(Collectors.toSet()));
        return authorities;
    }

    @Transactional
    public UserDetails createUser(String email, String name) {
        // Create a new User entity
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(name);

        // Assign default role
        RolesEntity defaultRole = roleRepository.findByRole("USER").orElseThrow(() -> new RuntimeException("Role Not Found"));
        userEntity.setRolesEntities(Set.of(defaultRole));
        userEntity.setEmail(email.toLowerCase());
        userEntity.setPassword(passwordEncoder.passwordEncoder().encode(UUID.randomUUID().toString())); // Encode the access

        Plan freePlan = planRepository.findByName(PlanType.FREE)
                .orElseThrow(() -> new RuntimeException("Free plan not found"));

        log.info("Plan" , freePlan.getName());

        // 4. Create a UserPlan for the FREE plan
        UserPlan userPlan = new UserPlan();
        userPlan.setPlan(freePlan);
        userPlan.setUser(userEntity);
        userPlan.setPurchasedAt(LocalDateTime.now());
        userPlan.setIsActive(true); // Set as active
        userPlan.setTotalUsed(0);

        // 5. Link plan to user
        Set<UserPlan> plans = new HashSet<>();
        plans.add(userPlan);
        userEntity.setPlans(plans);

        log.info("User Details :" , userEntity.getEmail());

        userRepository.save(userEntity);                                                  // token as password



        return new org.springframework.security.core.userdetails.User(
                userEntity.getEmail(), userEntity.getPassword(), getAuthorities(userEntity));
    }
}