package com.outsmart.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.userdetails.User;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users")
/*
In JPA, @ManyToOne means:

“Many instances of this entity are related to one instance of another entity.”
 */
public class UserEntity {

    @Column(name = "user_name", nullable = false, length = 50)
    private String username;
    @Column(name = "user_password", nullable = false, length = 100)
    private String password;
    @Column(name = "user_email", nullable = false, unique = true, length = 100)
    @Id
    private String email;

    @JsonManagedReference
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_email", referencedColumnName = "user_email"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Set<RolesEntity> rolesEntities;
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "is_suspended")
    private Boolean isSuspended = false;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;


    @OneToMany(mappedBy = "user")
    private Set<UserPlan> plans;


}
