package com.ty.PresentationApp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ty.PresentationApp.dto.CompletedPresentationResponseDto;
import com.ty.PresentationApp.dto.RatingRequestDto;
import com.ty.PresentationApp.dto.RatingResponseDto;
import com.ty.PresentationApp.exception.UserNotFoundException;
import com.ty.PresentationApp.service.ReportService;
import com.ty.PresentationApp.service.ratingService;

@RestController
@RequestMapping("/rating")
@CrossOrigin(origins = "http://localhost:3000/")
public class RatingController {

	private ratingService rService;
	private ReportService reportService;

	public RatingController(ratingService rService, ReportService reportService) {
		this.rService = rService;
		this.reportService = reportService;
	}

	@PutMapping("/rate/userid/{userId}/presentationid/{presentationId}")
	public ResponseEntity<?> rate(@PathVariable Integer userId, @PathVariable Integer presentationId,
			@RequestBody RatingRequestDto request) {
		try {
			request.setUserId(userId);
			request.setPresentationId(presentationId);

			RatingResponseDto response = rService.ratePresentation(request);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping("/presentation/{presentationId}")
	public ResponseEntity<?> get(@PathVariable Integer presentationId) {
		List<RatingResponseDto> ratings = rService.getRatingsByPresentationId(presentationId);
		if (ratings.isEmpty()) {
			return ResponseEntity.badRequest().body("No presentations found for user with ID: " + presentationId);
		}
		return ResponseEntity.ok(ratings);
	}

	@GetMapping("/student/{userId}")
	public ResponseEntity<?> getAll(@PathVariable Integer userId) {
		List<RatingResponseDto> ratings = rService.getOverallRatingsByUserId(userId);
		if (ratings.isEmpty()) {
			return ResponseEntity.badRequest().body("No rating found for user with ID: " + userId);
		}
		return ResponseEntity.ok(ratings);

	}

//	@GetMapping("/completed/student/{userId}")
//	public ResponseEntity<?> getFormattedCompletedPresentationsWithRatings(@PathVariable Integer userId) {
//	    try {
//	        CompletedPresentationResponseDto response = rService.getCompletedPresentationsWithRatings(userId);
//	        if (response.getCompletedPresentationCount() == 0) {
//	            return ResponseEntity.badRequest().body("No completed presentations found for user with ID: " + userId);
//	        }
//	        return ResponseEntity.ok(response);
//	    } catch (UserNotFoundException e) {
//	        return ResponseEntity.badRequest().body(e.getMessage());
//	    } catch (Exception e) {
//	        return ResponseEntity.badRequest().body("An unexpected error occurred: " + e.getMessage());
//	    }
//	}
	@GetMapping("/completed/student/{userId}")
	public ResponseEntity<?> getFormattedCompletedPresentationsWithRatings(@PathVariable Integer userId) {
		try {
			CompletedPresentationResponseDto response = rService.getCompletedPresentationsWithRatings(userId);

			if (response.getCompletedPresentationCount() == 0) {
				return ResponseEntity.badRequest().body("No completed presentations found for user with ID: " + userId);
			}

			// Send the progress report email
			reportService.sendProgressReportByEmail(userId);

			return ResponseEntity.ok("Progress report sent successfully.");
		} catch (UserNotFoundException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("An unexpected error occurred: " + e.getMessage());
		}
	}

}
