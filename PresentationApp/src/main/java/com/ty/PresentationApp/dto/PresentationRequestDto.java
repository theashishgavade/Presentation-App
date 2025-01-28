package com.ty.PresentationApp.dto;

import com.ty.PresentationApp.enums.PresentationStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PresentationRequestDto {

//    @NotNull
    private Integer userId;

//    @NotNull
//    @Size(min = 2, message = "Course name cannot be empty")
    private String course;

//    @NotNull
    private PresentationStatus presentationStatus;
}
