package com.ty.PresentationApp.controller;

import java.util.List;
import java.util.Map;

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

import com.ty.PresentationApp.dto.UserRequestDto;
import com.ty.PresentationApp.dto.UserResponseDto;
import com.ty.PresentationApp.enums.Role;
import com.ty.PresentationApp.enums.Status;
import com.ty.PresentationApp.exception.UserNotFoundException;
import com.ty.PresentationApp.service.userService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

	private userService uService;

	public UserController(userService uService) {
		this.uService = uService;
	}

	// Register a new user
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody UserRequestDto request) {
		if (uService.registerUser(request)) {
			return ResponseEntity.ok("User registered successfully");
		} else {
			return ResponseEntity.badRequest().body("Email already exists");
		}
	}

//	// Login a user
//	@PostMapping("/login")
//    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
//        try {
//            String role = uService.login(email, password); // Changed to retrieve the role
//            return ResponseEntity.ok(role); // Returning the role instead of a success message
//        } catch (UserNotFoundException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

	// Login a user
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
	    try {
	        Map<String, Object> response = uService.login(email, password);
	        return ResponseEntity.ok(response); // Return userId & roe
	    } catch (UserNotFoundException e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}

	
	// Logout a user (also changes the status to INACTIVE)
	@PostMapping("/logout")
	public ResponseEntity<String> logout(@RequestParam Integer userId) {
		uService.logout(userId);
		return ResponseEntity.ok("Logout successful");
	}

	// Get user details by ID
	@GetMapping("/student/{userId}")
	public ResponseEntity<?> getStudentById(@PathVariable Integer userId) {
		UserResponseDto user = uService.getUserById(userId);
		if (user.getRole() == Role.ADMIN) {
			return ResponseEntity.badRequest().body("Access to admin details is restricted");
		}
		return ResponseEntity.ok(user);
	}

	// Get admin details by ID
	@GetMapping("/admin/{userId}")
	public ResponseEntity<?> getAdminById(@PathVariable Integer userId) {
		UserResponseDto user = uService.getUserDetailsForAdmin(userId);
		return ResponseEntity.ok(user);
	}

	// Get all users (Admin only)
	@GetMapping("/admin/{adminId}/all")
	public ResponseEntity<?> getAllUsers(@PathVariable Integer adminId) {
		UserResponseDto user = uService.getUserById(adminId);
		if (user.getRole() != Role.ADMIN) {
			return ResponseEntity.badRequest().body("Access to details is restricted");
		}
		List<UserResponseDto> users = uService.getAllUsers();
		return ResponseEntity.ok(users);

	}

	// Update user status (Admin only)
	@PutMapping("/admin/{adminId}/status")
	public ResponseEntity<String> updateUserStatus(@PathVariable Integer adminId, @RequestParam Integer userId,
			@RequestParam Status status) {
		// Fetch admin details
		UserResponseDto admin = uService.getUserDetailsForAdmin(adminId);

		// Validate if the requesting user is an admin
		if (admin.getRole() != Role.ADMIN) {
			return ResponseEntity.badRequest().body("Only admins can update user statuses.");
		}

		// Fetch user details without status restriction
		UserResponseDto user = uService.getUserDetailsForAdmin(userId);

		// Prevent admins from changing the status of another admin
		if (user.getRole() == Role.ADMIN) {
			return ResponseEntity.badRequest().body("Admins cannot update the status of another admin.");
		}

		// Perform the status update
		uService.updateUserStatus(userId, status);

		return ResponseEntity.ok("User status updated successfully.");
	}

}
