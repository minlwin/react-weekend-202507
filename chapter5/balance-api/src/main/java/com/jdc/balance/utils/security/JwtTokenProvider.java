package com.jdc.balance.utils.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenProvider {

	public Authentication parseAccess(String token) {
		// TODO Auto-generated method stub
		return null;
	}

	public Authentication parseRefresh(String token) {
		// TODO Auto-generated method stub
		return null;
	}

	public String createAccessToken(Authentication auth) {
		// TODO Auto-generated method stub
		return null;
	}

	public String createRefreshToken(Authentication auth) {
		// TODO Auto-generated method stub
		return null;
	}

}
