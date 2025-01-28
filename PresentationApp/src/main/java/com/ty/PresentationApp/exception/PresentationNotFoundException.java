package com.ty.PresentationApp.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;

public class PresentationNotFoundException extends RuntimeException{

	private String message;

	public PresentationNotFoundException(String message) {
		this.message=message;
	}
	
	@ExceptionHandler
	@Override
	public String getMessage() {
		return message;
	}
}
