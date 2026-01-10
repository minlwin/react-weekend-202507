package com.jdc.balance.utils.exceptions;

import org.springframework.security.core.AuthenticationException;

public class TokenInvalidationException extends AuthenticationException {

	public TokenInvalidationException(String msg) {
		super(msg);
	}

	public TokenInvalidationException(Exception e) {
		super(e.getMessage(), e);
	}

	private static final long serialVersionUID = 1L;

}
