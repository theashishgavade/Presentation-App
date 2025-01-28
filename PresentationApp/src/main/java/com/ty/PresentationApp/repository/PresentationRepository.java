package com.ty.PresentationApp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ty.PresentationApp.entity.Presentation;

public interface PresentationRepository extends JpaRepository<Presentation, Integer> {

    // Find all presentations by user ID
    @Query("select p from Presentation p where p.user.id = ?1")
    List<Presentation> findByUser_Id(Integer id);
    

    // Find presentation by presentation ID and user ID
    @Query("select p from Presentation p where p.id = ?1 and p.user.id = ?2")
    Optional<Presentation> findByPIdAndUser_UId(Integer pId, Integer uId);

    // Check if a presentation exists for a specific user
    @Query("select count(p) > 0 from Presentation p where p.id = ?1 and p.user.id = ?2")
    boolean existsByPIdAndUser_UId(Integer pId, Integer uId);
    
    @Query("select count(p) > 0 from Presentation p where p.user.id = ?1 and p.course = ?2")
    boolean existsByUserIdAndCourse(Integer userId, String course);

}
