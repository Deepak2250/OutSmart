package com.outsmart.payload.users;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateRequest {

    @Size(max = 255)
    private String name;

    @Size(max = 10000)
    private String description;

    @Size(max = 255)
    private String profession;

    @Size(max = 255)
    private String location;
}
