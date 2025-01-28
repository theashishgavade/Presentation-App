package com.ty.PresentationApp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ty.PresentationApp.entity.Rating;

public interface RatingRepository extends JpaRepository<Rating, Integer> {

    // Find all ratings for a specific user
    @Query("select r from Rating r where r.user.id = ?1")
    List<Rating> findByUser_Id(Integer id);

    // Find all ratings for a specific presentation
    @Query("select r from Rating r where r.presentation.id = ?1")
    List<Rating> findByPresentation_Id(Integer id);

    // Find rating by user ID and presentation ID
    @Query("select r from Rating r where r.user.id = ?1 and r.presentation.id = ?2")
    Rating findByUser_IdAndPresentation_Id(Integer userId, Integer presId);

    // Check if a rating exists for a specific presentation and user
    @Query("select count(r) > 0 from Rating r where r.presentation.id = ?1 and r.user.id = ?2")
    boolean existsByPresentation_IdAndUser_Id(Integer presId, Integer userId);
    
    
}
