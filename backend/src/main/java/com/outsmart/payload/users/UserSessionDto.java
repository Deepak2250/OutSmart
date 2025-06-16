package com.outsmart.payload.users;


import com.outsmart.entities.RolesEntity;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class UserSessionDto {
    private String email;
    private String fullName;
    private Set<String> role;
    private String accessToken;
}
