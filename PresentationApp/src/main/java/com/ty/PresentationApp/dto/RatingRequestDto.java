package com.ty.PresentationApp.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class RatingRequestDto {

//    @NotNull
    private Integer userId;

//    @NotNull
    private Integer presentationId;

//    @NotNull
    @Min(value = 1, message = "Communication score must be at least 1")
    @Max(value = 5, message = "Communication score must not exceed 5")
    private Integer communication;

//    @NotNull
    @Min(value = 1, message = "Confidence score must be at least 1")
    @Max(value = 5, message = "Confidence score must not exceed 5")
    private Integer confidence;

//    @NotNull
    @Min(value = 1, message = "Content score must be at least 1")
    @Max(value = 5, message = "Content score must not exceed 5")
    private Integer content;

//    @NotNull
    @Min(value = 1, message = "Interaction score must be at least 1")
    @Max(value = 5, message = "Interaction score must not exceed 5")
    private Integer interaction;

//    @NotNull
    @Min(value = 1, message = "Liveliness score must be at least 1")
    @Max(value = 5, message = "Liveliness score must not exceed 5")
    private Integer liveliness;

//    @NotNull
    @Min(value = 1, message = "Usage of props score must be at least 1")
    @Max(value = 5, message = "Usage of props score must not exceed 5")
    private Integer usageProps;
}
