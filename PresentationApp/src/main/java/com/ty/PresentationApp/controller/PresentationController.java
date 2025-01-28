package com.ty.PresentationApp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ty.PresentationApp.dto.PresentationRequestDto;
import com.ty.PresentationApp.dto.PresentationResponseDto;
import com.ty.PresentationApp.dto.UserResponseDto;
import com.ty.PresentationApp.enums.PresentationStatus;
import com.ty.PresentationApp.enums.Role;
import com.ty.PresentationApp.service.presentationService;
import com.ty.PresentationApp.service.userService;

@RestController
@RequestMapping("/presentation")
@CrossOrigin(origins = "http://localhost:3000/")
public class PresentationController {

	private presentationService pService;
	private userService uService;

	public PresentationController(presentationService pService, userService uService) {
		this.pService = pService;
		this.uService = uService;
	}

	@PostMapping("/admin/assign/{userId}")
	public ResponseEntity<?> assign(@PathVariable Integer userId, @RequestBody PresentationRequestDto request) {
		try {
			// Validate if the user exists
			UserResponseDto user = uService.getUserDetailsForAdmin(userId);

			if (user.getRole() == Role.ADMIN) {
				return ResponseEntity.badRequest().body("Cannot assign presentation to Admin");
			}

			// Check if the course name already exists for the user
			boolean courseExists = pService.courseExistsForUser(userId, request.getCourse());
			if (courseExists) {
				return ResponseEntity.badRequest()
						.body(request.getCourse() + " presentation is already exists for user " + userId);
			}

			// Set the userId in the request object
			request.setUserId(userId);

			// Assign the presentation
			PresentationResponseDto response = pService.assignPresentation(request);
			return ResponseEntity.ok(response);

		} catch (Exception e) {
			return ResponseEntity.badRequest().body("User " + userId + " does not exist in the database");
		}
	}

	// For Admin
	@GetMapping("/id/{presentationId}")
	public ResponseEntity<?> get(@PathVariable Integer presentationId) {
		try {
			// Validate if the presentation exists
			PresentationResponseDto response = pService.getPresentationById(presentationId);

			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("No presentation found with ID: " + presentationId);
		}
	}

	@GetMapping("/student/{userId}")
	public ResponseEntity<?> getAll(@PathVariable Integer userId) {
		try {
			// Validate if the user exists
			UserResponseDto user = uService.getUserDetailsForAdmin(userId);

			// Ensure the user is a student
			if (user.getRole() != Role.STUDENT) {
				return ResponseEntity.badRequest().body("Cannot access presentations for non-student users");
			}

			// Retrieve presentations for the student
			List<PresentationResponseDto> presentations = pService.getPresentationsByUserId(userId);

			// Handle case where no presentations are found
			if (presentations.isEmpty()) {
				return ResponseEntity.badRequest().body("No presentations found for user with ID: " + userId);
			}

			return ResponseEntity.ok(presentations);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("User with ID " + userId + " does not exist");
		}
	}

	// Pending from here //

	@PutMapping("/student/{userId}/status")
	public ResponseEntity<String> changeStatus(@PathVariable Integer userId, @RequestParam Integer presentationId,
			@RequestParam PresentationStatus status) {
		try {
			// Validate if the user exists
			UserResponseDto user = uService.getUserById(userId);

			// Check if the user has the presentation assigned
			boolean hasPresentation = pService.userHasPresentation(userId, presentationId);
			if (!hasPresentation) {
				return ResponseEntity.badRequest().body(
						"Presentation with ID: " + presentationId + " is not assigned to user with ID: " + userId);
			}

			// Change the presentation status
			pService.changePresentationStatus(presentationId, status);
			return ResponseEntity.ok("Presentation status updated successfully");

		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

//	@PutMapping("/{presentationId}/score")
//	public ResponseEntity<String> score(@PathVariable Integer presentationId, @RequestParam Double score) {
//		try {
//			pService.savePresentationScore(presentationId, score);
//			return ResponseEntity.ok("Presentation score saved successfully");
//		} catch (Exception e) {
//			return ResponseEntity.badRequest().body("No presentations found for user with ID: " + presentationId);
//		}
//	}
}
