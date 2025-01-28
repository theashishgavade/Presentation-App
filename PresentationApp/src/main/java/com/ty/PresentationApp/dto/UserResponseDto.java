package com.ty.PresentationApp.dto;

import com.ty.PresentationApp.enums.Role;
import com.ty.PresentationApp.enums.Status;

import lombok.Data;

@Data
public class UserResponseDto {

    private Integer id;
    private String name;
    private String email;
    private Long phone;
    private Status status;
    private Role role;
    private Double userTotalScore;
}
