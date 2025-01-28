package com.ty.PresentationApp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.ty.PresentationApp.dto.PresentationRequestDto;
import com.ty.PresentationApp.dto.PresentationResponseDto;
import com.ty.PresentationApp.entity.Presentation;
import com.ty.PresentationApp.entity.User;
import com.ty.PresentationApp.enums.PresentationStatus;
import com.ty.PresentationApp.exception.PresentationNotFoundException;
import com.ty.PresentationApp.exception.UserNotFoundException;
import com.ty.PresentationApp.repository.PresentationRepository;
import com.ty.PresentationApp.repository.UserRepository;

@Service
public class presentationService {

	private PresentationRepository pRepo;
	private UserRepository uRepo;

	public presentationService(PresentationRepository pRepo, UserRepository uRepo) {
		this.pRepo = pRepo;
		this.uRepo = uRepo;
	}

	public PresentationResponseDto assignPresentation(PresentationRequestDto request) {
		User user = uRepo.findById(request.getUserId()).orElseThrow(() -> new UserNotFoundException("User not found"));

		Presentation presentation = new Presentation();
		BeanUtils.copyProperties(request, presentation);
		presentation.setUser(user);
		presentation.setPresentationStatus(PresentationStatus.ASSIGNED);

		pRepo.save(presentation);

		PresentationResponseDto response = new PresentationResponseDto();
		BeanUtils.copyProperties(presentation, response);
		response.setUserId(user.getId());

		return response;
	}

	public boolean courseExistsForUser(Integer userId, String course) {
		return pRepo.existsByUserIdAndCourse(userId, course);
	}

	public PresentationResponseDto getPresentationById(Integer presentationId) {
		Presentation presentation = pRepo.findById(presentationId)
				.orElseThrow(() -> new PresentationNotFoundException("Presentation not found"));

		PresentationResponseDto response = new PresentationResponseDto();
		BeanUtils.copyProperties(presentation, response);
		response.setUserId(presentation.getUser().getId());

		return response;
	}

	public List<PresentationResponseDto> getPresentationsByUserId(Integer userId) {
		List<Presentation> presentations = pRepo.findByUser_Id(userId);
		List<PresentationResponseDto> presentationResponseDtos = new ArrayList<>();

		for (Presentation presentation : presentations) {
			PresentationResponseDto response = new PresentationResponseDto();
			BeanUtils.copyProperties(presentation, response);
			response.setUserId(userId);
			presentationResponseDtos.add(response);
		}

		return presentationResponseDtos;
	}

	public void changePresentationStatus(Integer presentationId, PresentationStatus status) {
	    Presentation presentation = pRepo.findById(presentationId)
	            .orElseThrow(() -> new PresentationNotFoundException("Presentation not found"));

	    // Check if the current status is COMPLETED and throw an error if so
	    if (presentation.getPresentationStatus() == PresentationStatus.COMPLETED) {
	        throw new IllegalStateException("Cannot change the status of a completed presentation.");
	    }

	    // Update the presentation status
	    presentation.setPresentationStatus(status);
	    pRepo.save(presentation);
	}


	public void savePresentationScore(Integer presentationId, Double score) {
		Presentation presentation = pRepo.findById(presentationId)
				.orElseThrow(() -> new PresentationNotFoundException("Presentation not found"));

		presentation.setPresentationTotalScore(score);
		pRepo.save(presentation);

		updateUserTotalScore(presentation.getUser().getId());
	}

	private void updateUserTotalScore(Integer userId) {
		List<Presentation> presentations = pRepo.findByUser_Id(userId);
		List<Presentation> completedPresentations = new ArrayList<>();

		// Manually filter completed presentations
		for (Presentation presentation : presentations) {
			if (presentation.getPresentationStatus() == PresentationStatus.COMPLETED
					&& presentation.getPresentationTotalScore() != null
					&& presentation.getPresentationTotalScore() > 0) {
				completedPresentations.add(presentation);
			}
		}

		// Calculate the average score manually
		double totalScore = 0.0;
		int count = 0;

		for (Presentation presentation : completedPresentations) {
			totalScore += presentation.getPresentationTotalScore();
			count++;
		}

		double userTotalScore = (count > 0) ? totalScore / count : 0.0;

		User user = uRepo.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));

		user.setUserTotalScore(userTotalScore);
		uRepo.save(user);
	}

	public boolean userHasPresentation(Integer userId, Integer presentationId) {
		return pRepo.existsByPIdAndUser_UId(presentationId, userId);
	}

}
