package com.jdc.balance.utils.exceptions;

import org.springframework.security.core.AuthenticationException;

public class LoginRequiredException extends AuthenticationException{

	public LoginRequiredException() {
		super("You have to login for this operation");
	}

	private static final long serialVersionUID = 1L;

}
