package com.jdc.weekend.rest.exception;

import org.springframework.security.core.AuthenticationException;

public class TokenExpirationException extends AuthenticationException{

	public TokenExpirationException(Exception cause) {
		super("Token is expired.", cause);
	}

	private static final long serialVersionUID = 1L;

}
