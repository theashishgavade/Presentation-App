package com.ty.PresentationApp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ty.PresentationApp.entity.User;
import com.ty.PresentationApp.enums.Status;

public interface UserRepository extends JpaRepository<User, Integer> {

    // Find user by email
    @Query("select u from User u where u.email = ?1")
    Optional<User> findByEmail(String email);

    // Find all active users
    @Query("select u from User u where u.status = ?1")
    Optional<List<User>> findByStatus(Status status);

    // Check if an email already exists
    @Query("select count(u) > 0 from User u where u.email = ?1")
    boolean existsByEmail(String email);

    // Find user by email and password (for login)
    @Query("select u from User u where u.email = ?1 and u.pass = ?2")
    Optional<User> findByEmailAndPass(String email, String pass);
}
