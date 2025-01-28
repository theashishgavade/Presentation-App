package com.ty.PresentationApp.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.ty.PresentationApp.dto.UserRequestDto;
import com.ty.PresentationApp.dto.UserResponseDto;
import com.ty.PresentationApp.entity.User;
import com.ty.PresentationApp.enums.Status;
import com.ty.PresentationApp.exception.UserNotFoundException;
import com.ty.PresentationApp.repository.UserRepository;

@Service
public class userService {

	private UserRepository uRepo;
	private EmailService emailService; // Add EmailService as a dependency

	public userService(UserRepository uRepo, EmailService emailService) {
		this.uRepo = uRepo;
		this.emailService = emailService; // Initialize EmailService
	}

	public boolean registerUser(UserRequestDto request) {
		Optional<User> opt = uRepo.findByEmail(request.getEmail());

		if (opt.isPresent()) {
			return false;
		} else {
			User user = new User();
			BeanUtils.copyProperties(request, user);
			user.setStatus(Status.INACTIVE);
			uRepo.save(user);

			// Send a welcome email after registration
			emailService.sendEmail(user.getEmail(), "Welcome to PresentationApp!", "Hi " + user.getName()
					+ ",\n\nThank you for registering with PresentationApp. "
					+ "Please activate your account to start using our services.\n\nBest Regards,\nTeam PresentationApp");

			return true;
		}
	}

//	public String login(String email, String password) { // Changed return type to String to return the role
//		User user = uRepo.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User is not registered"));
//
//		if (user.getPass() != null && user.getPass().equals(password)) {
//			user.setStatus(Status.ACTIVE);
//			uRepo.save(user);
//
//			// Send a notification email on successful login
//			// emailService.sendEmail(
//			// user.getEmail(),
//			// "Login Notification",
//			// "Hi " + user.getName() + ",\n\nYou have successfully logged in to
//			// PresentationApp.\n\nBest Regards,\nTeam PresentationApp"
//			// );
//
//			return user.getRole().name(); // Return the role of the user
//		} else {
//			throw new IllegalArgumentException("Invalid email or password"); // Changed from boolean to throw exception
//		}
//	}

	public Map<String, Object> login(String email, String password) {
	    User user = uRepo.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User is not registered"));

	    if (user.getPass() != null && user.getPass().equals(password)) {
	        user.setStatus(Status.ACTIVE);
	        uRepo.save(user);

	        // Prepare response data
	        Map<String, Object> response = new HashMap<>();
	        response.put("userId", user.getId());
	        response.put("role", user.getRole().name()); // Return role as a string

	        return response;
	    } else {
	        throw new IllegalArgumentException("Invalid email or password");
	    }
	}

	
	public void logout(Integer userId) {
		User user = uRepo.findById(userId).orElseThrow(() -> new UserNotFoundException("User is not registered"));
		user.setStatus(Status.INACTIVE);
		uRepo.save(user);

		// Send a notification email on logout
//        emailService.sendEmail(
//            user.getEmail(),
//            "Logout Notification",
//            "Hi " + user.getName() + ",\n\nYou have successfully logged out of PresentationApp.\n\nBest Regards,\nTeam PresentationApp"
//        );
	}

	public UserResponseDto getUserById(Integer userId) {
		User user = uRepo.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));

		if (user.getStatus() != Status.ACTIVE) {
			throw new UserNotFoundException("Inactive user cannot perform this action");
		}

		UserResponseDto response = new UserResponseDto();
		BeanUtils.copyProperties(user, response);
		return response;
	}

	// Fetch user details without checking status (Admin Only)
	public UserResponseDto getUserDetailsForAdmin(Integer userId) {
		User user = uRepo.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));

		UserResponseDto response = new UserResponseDto();
		BeanUtils.copyProperties(user, response);
		return response;
	}

	public List<UserResponseDto> getAllUsers() {
		List<User> users = uRepo.findAll();
		List<UserResponseDto> userResponseDtos = new ArrayList<>();

		for (User user : users) {
			UserResponseDto response = new UserResponseDto();
			BeanUtils.copyProperties(user, response);
			userResponseDtos.add(response);
		}

		return userResponseDtos;
	}

	public void updateUserStatus(Integer userId, Status status) {
		User user = uRepo.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
		user.setStatus(status);
		uRepo.save(user);
	}
}
