package com.ty.PresentationApp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Entity
@Data
public class Rating {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Min(value = 1, message = "Communication score must be at least 1")
	@Max(value = 5, message = "Communication score must not exceed 5")
	private Integer communication;

	@Min(value = 1, message = "Confidence score must be at least 1")
	@Max(value = 5, message = "Confidence score must not exceed 5")
	private Integer confidence;

	@Min(value = 1, message = "Content score must be at least 1")
	@Max(value = 5, message = "Content score must not exceed 5")
	private Integer content;

	@Min(value = 1, message = "Interaction score must be at least 1")
	@Max(value = 5, message = "Interaction score must not exceed 5")
	private Integer interaction;

	@Min(value = 1, message = "Liveliness score must be at least 1")
	@Max(value = 5, message = "Liveliness score must not exceed 5")
	private Integer liveliness;

	@Min(value = 1, message = "Usage of props score must be at least 1")
	@Max(value = 5, message = "Usage of props score must not exceed 5")
	private Integer usageProps;

	private Double totalScore;

	@ManyToOne
	private User user;

	@ManyToOne
	private Presentation presentation;
}
