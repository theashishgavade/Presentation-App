package com.ty.PresentationApp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.HeadersBuilder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppExceptionHandler {

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<String> catchUserNotFound(UserNotFoundException message) {
		return new ResponseEntity<String>(message.getMessage(), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(PresentationNotFoundException.class)
	public HeadersBuilder<?> catchPresentationNotFoundException() {
		return ResponseEntity.notFound();
	}

}
