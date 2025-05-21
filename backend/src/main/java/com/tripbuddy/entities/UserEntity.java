package com.tripbuddy.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Table(name = "users")
public class UserEntity {

    @Column(name = "user_name", nullable = false, unique = false, length = 50)
    private String username;
    @Column(name = "user_password", nullable = false, unique = false, length = 100)
    private String password;
    @Column(name = "user_email", nullable = false, unique = true, length = 100)
    @Id
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<RolesEntity> rolesEntities;
}
