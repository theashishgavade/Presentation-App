package com.ty.PresentationApp.dto;

import java.util.List;

import lombok.Data;

@Data
public class CompletedPresentationResponseDto {
    private String userName;
    private int completedPresentationCount;
    private List<PresentationDetails> presentations;
    private double averageScore;

    @Data
    public static class PresentationDetails {
        private String course;
        private int communication;
        private int confidence;
        private int content;
        private int interaction;
        private int liveliness;
        private int usageProps;
        private double totalScore;
    }
}
