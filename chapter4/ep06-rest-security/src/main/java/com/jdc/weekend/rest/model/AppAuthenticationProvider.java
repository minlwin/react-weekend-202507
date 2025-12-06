package com.jdc.weekend.rest.model;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AppAuthenticationProvider extends DaoAuthenticationProvider{

	public AppAuthenticationProvider(AppUserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
		super(userDetailsService);
		setPasswordEncoder(passwordEncoder);
		setHideUserNotFoundExceptions(false);
	}

}
