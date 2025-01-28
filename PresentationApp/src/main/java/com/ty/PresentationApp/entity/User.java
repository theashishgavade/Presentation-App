package com.ty.PresentationApp.entity;

import java.util.List;

import com.ty.PresentationApp.enums.Role;
import com.ty.PresentationApp.enums.Status;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

//	@Size(min = 3, message = "Name cannot be empty")
	private String name;

	@Column(unique = true)
//	@Email(message = "Email should be valid")
	private String email;

	@Column(unique = true)
	private Long phone;

	private String pass;

	@Enumerated(EnumType.STRING)
	private Status status;

	@Enumerated(EnumType.STRING)
	private Role role;

	private Double userTotalScore;

	// One User can have many Presentations
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Presentation> presentations;

//    // One User can have many Ratings
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Rating> ratings;
}
