package com.ty.PresentationApp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.ty.PresentationApp.dto.CompletedPresentationResponseDto;
import com.ty.PresentationApp.dto.RatingRequestDto;
import com.ty.PresentationApp.dto.RatingResponseDto;
import com.ty.PresentationApp.entity.Presentation;
import com.ty.PresentationApp.entity.Rating;
import com.ty.PresentationApp.entity.User;
import com.ty.PresentationApp.enums.PresentationStatus;
import com.ty.PresentationApp.enums.Role;
import com.ty.PresentationApp.exception.PresentationNotFoundException;
import com.ty.PresentationApp.exception.UserNotFoundException;
import com.ty.PresentationApp.repository.PresentationRepository;
import com.ty.PresentationApp.repository.RatingRepository;
import com.ty.PresentationApp.repository.UserRepository;

@Service
public class ratingService {

	private RatingRepository rRepo;
	private UserRepository uRepo;
	private PresentationRepository pRepo;

	public ratingService(RatingRepository rRepo, UserRepository uRepo, PresentationRepository pRepo) {
		this.rRepo = rRepo;
		this.uRepo = uRepo;
		this.pRepo = pRepo;
	}

	public RatingResponseDto ratePresentation(RatingRequestDto request) {
		// Fetch the user and presentation entities.
		User user = uRepo.findById(request.getUserId()).orElseThrow(() -> new UserNotFoundException("User not found"));

		if (user.getRole() == Role.ADMIN) {
			throw new UserNotFoundException("Admins don't have any presentations.");
		}

		Presentation presentation = pRepo.findById(request.getPresentationId())
				.orElseThrow(() -> new PresentationNotFoundException("Presentation not found"));

		// Check if the rating already exists for the given user and presentation.
		Rating rating = rRepo.findByUser_IdAndPresentation_Id(request.getUserId(), request.getPresentationId());

		if (rating == null) {
			// If the rating does not exist, create a new rating.
			rating = new Rating();
		}

		// Copy properties from the request DTO to the Rating object.
		BeanUtils.copyProperties(request, rating);
		rating.setUser(user);
		rating.setPresentation(presentation);

		// Calculate the average of all the ratings
		double averageScore = (rating.getCommunication() + rating.getConfidence() + rating.getContent()
				+ rating.getInteraction() + rating.getLiveliness() + rating.getUsageProps()) / 6.0;
		rating.setTotalScore(averageScore);

		// Save the rating (this will update if the rating already exists).
		rRepo.save(rating);

		// Set the presentation's status to completed if it's not already.
		presentation.setPresentationStatus(PresentationStatus.COMPLETED);

		// Update the presentation's total score.
		updatePresentationTotalScore(presentation.getId());

		// Update the user's total score.
		updateUserTotalScore(user.getId());

		// Create and return the response DTO.
		RatingResponseDto response = new RatingResponseDto();
		BeanUtils.copyProperties(rating, response);
		response.setUserId(user.getId());
		response.setPresentationId(presentation.getId());

		return response;
	}

	private void updatePresentationTotalScore(Integer presentationId) {
		List<Rating> ratings = rRepo.findByPresentation_Id(presentationId);

		double totalScore = 0.0;
		int count = 0;
		for (Rating rating : ratings) {
			totalScore += rating.getTotalScore();
			count++;
		}

		if (count > 0) {
			totalScore /= count;
		}

		Presentation presentation = pRepo.findById(presentationId)
				.orElseThrow(() -> new PresentationNotFoundException("Presentation not found"));

		presentation.setPresentationTotalScore(totalScore);
		pRepo.save(presentation);
	}

	private void updateUserTotalScore(Integer userId) {
		List<Presentation> presentations = pRepo.findByUser_Id(userId);

		List<Presentation> completedPresentations = new ArrayList<>();
		for (Presentation presentation : presentations) {
			if (presentation.getPresentationStatus() == PresentationStatus.COMPLETED
					&& presentation.getPresentationTotalScore() != null
					&& presentation.getPresentationTotalScore() > 0) {
				completedPresentations.add(presentation);
			}
		}

		double userTotalScore = 0.0;
		int count = 0;
		for (Presentation presentation : completedPresentations) {
			userTotalScore += presentation.getPresentationTotalScore();
			count++;
		}

		if (count > 0) {
			userTotalScore /= count;
		}

		User user = uRepo.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));

		user.setUserTotalScore(userTotalScore);
		uRepo.save(user);
	}

	public List<RatingResponseDto> getRatingsByPresentationId(Integer presentationId) {
		List<Rating> ratings = rRepo.findByPresentation_Id(presentationId);
		List<RatingResponseDto> responseList = new ArrayList<>();

		for (Rating rating : ratings) {
			RatingResponseDto response = new RatingResponseDto();
			BeanUtils.copyProperties(rating, response);
			response.setPresentationId(presentationId);
			response.setUserId(rating.getUser().getId());
			responseList.add(response);
		}

		return responseList;
	}

	public List<RatingResponseDto> getOverallRatingsByUserId(Integer userId) {
		List<Rating> ratings = rRepo.findByUser_Id(userId);
		List<RatingResponseDto> responseList = new ArrayList<>();

		for (Rating rating : ratings) {
			RatingResponseDto response = new RatingResponseDto();
			BeanUtils.copyProperties(rating, response);
			response.setUserId(userId);
			response.setPresentationId(rating.getPresentation().getId());
			responseList.add(response);
		}

		return responseList;
	}

	public CompletedPresentationResponseDto getCompletedPresentationsWithRatings(Integer userId) {
		// Validate if the user exists
		User user = uRepo.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
		
		if(user.getRole()==Role.ADMIN) {
			throw new UserNotFoundException("Admins don't have any presentations.");
		}

		// Fetch all presentations for the user
		List<Presentation> presentations = pRepo.findByUser_Id(userId);

		// Filter only completed presentations
		List<Presentation> completedPresentations = new ArrayList<>();
		for (Presentation presentation : presentations) {
		    if (presentation.getPresentationStatus() == PresentationStatus.COMPLETED) {
		        completedPresentations.add(presentation);
		    }
		}


		// Prepare the response DTO
		CompletedPresentationResponseDto response = new CompletedPresentationResponseDto();
		response.setUserName(user.getName());
		response.setCompletedPresentationCount(completedPresentations.size());

		List<CompletedPresentationResponseDto.PresentationDetails> presentationDetailsList = new ArrayList<>();
		double totalScoreSum = 0.0;

		// Populate presentation details
		for (Presentation presentation : completedPresentations) {
			List<Rating> ratings = rRepo.findByPresentation_Id(presentation.getId());

			for (Rating rating : ratings) {
				CompletedPresentationResponseDto.PresentationDetails details = new CompletedPresentationResponseDto.PresentationDetails();
				details.setCourse(presentation.getCourse());
				details.setCommunication(rating.getCommunication());
				details.setConfidence(rating.getConfidence());
				details.setContent(rating.getContent());
				details.setInteraction(rating.getInteraction());
				details.setLiveliness(rating.getLiveliness());
				details.setUsageProps(rating.getUsageProps());
				details.setTotalScore(rating.getTotalScore());

				presentationDetailsList.add(details);
				totalScoreSum += rating.getTotalScore();
			}
		}

		// Calculate the user's average score
		double averageScore;
		if (completedPresentations.size() > 0) {
		    averageScore = totalScoreSum / completedPresentations.size();
		} else {
		    averageScore = 0.0;
		}


		response.setPresentations(presentationDetailsList);
		response.setAverageScore(averageScore);

		return response;
	}

}
