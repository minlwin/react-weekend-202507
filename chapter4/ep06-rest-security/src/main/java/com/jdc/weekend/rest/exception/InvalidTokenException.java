package com.jdc.weekend.rest.exception;

import org.springframework.security.core.AuthenticationException;

public class InvalidTokenException extends AuthenticationException{

	private static final long serialVersionUID = 1L;

	public InvalidTokenException(String message) {
		super(message);
	}

	public InvalidTokenException(Exception cause) {
		super("JWT Token Exception", cause);
	}
}
