package com.ty.PresentationApp.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;

public class UserNotFoundException extends RuntimeException {

	private String message;

	public UserNotFoundException(String message) {
		this.message=message;
	}

	@ExceptionHandler
	@Override
	public String getMessage() {
		return message;
	}
}
