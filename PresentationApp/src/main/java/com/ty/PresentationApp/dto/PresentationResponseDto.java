package com.ty.PresentationApp.dto;

import com.ty.PresentationApp.enums.PresentationStatus;
import lombok.Data;

@Data
public class PresentationResponseDto {

    private Integer id;
    private Integer userId;
    private String course;
    private PresentationStatus presentationStatus;
    private Double presentationTotalScore;
}
