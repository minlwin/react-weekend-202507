package com.jdc.weekend.rest.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenService {

	public Authentication parseRefreshToken(String token) {
		// TODO Auto-generated method stub
		return null;
	}

	public Authentication parseAccessToken(String token) {
		// TODO Auto-generated method stub
		return null;
	}

	public String generateAccessToken(Authentication authentication) {
		// TODO Auto-generated method stub
		return null;
	}

	public String generateRefreshToken(Authentication authentication) {
		// TODO Auto-generated method stub
		return null;
	}

}
