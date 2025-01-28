package com.ty.PresentationApp.dto;

import com.ty.PresentationApp.enums.Role;
import com.ty.PresentationApp.enums.Status;

import lombok.Data;

@Data
public class UserRequestDto {

//    @Size(min = 3, message = "Name cannot be empty")
    private String name;

//    @Email(message = "Email should be valid")
    private String email;

    private Long phone;

    private String pass;

    private Status status;

    private Role role;
}
