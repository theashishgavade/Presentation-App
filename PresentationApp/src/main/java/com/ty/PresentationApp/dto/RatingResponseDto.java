package com.ty.PresentationApp.dto;

import lombok.Data;

@Data
public class RatingResponseDto {

    private Integer id;
    private Integer userId;
    private Integer presentationId;
    private Integer communication;
    private Integer confidence;
    private Integer content;
    private Integer interaction;
    private Integer liveliness;
    private Integer usageProps;
    private Double totalScore;
}
