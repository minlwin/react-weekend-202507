package com.jdc.balance.utils.exceptions;

import org.springframework.security.core.AuthenticationException;

public class TokenExpirationException extends AuthenticationException{

	public TokenExpirationException() {
		super("Access token is expired. Please refresh again.");
	}

	private static final long serialVersionUID = 1L;

}
