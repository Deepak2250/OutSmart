package com.outsmart.entities;

import com.outsmart.repositories.UserPlanRepository;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "user_plans")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserPlan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_email")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    private LocalDateTime purchasedAt;
    private Integer totalUsed = 0;
    private Boolean isActive = false;
    @Column(name = "deactivated_at")
    private LocalDateTime deactivatedAt;

    /*
    Checks if there are any other plans
    who are also active except this current
    plan then make them in active
     */
    @PrePersist @PreUpdate
    private void validateActivePlan() {
        if (this.isActive) {
            if (user.getPlans() != null) {
                user.getPlans().forEach(up -> {
                    if (up.getIsActive() && !Objects.equals(up.getId(), this.id)) {
                        up.setIsActive(false);
                    }
                });
            }
        }
    }
}