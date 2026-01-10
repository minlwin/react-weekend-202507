package com.jdc.balance.utils.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenProvider {
	
	public enum Type {
		Access, Refresh
	}
	
	@Value("${app.jwt.issuer}")
	private String issuer;
	@Value("${app.jwt.access-life}")
	private int accessLife;
	@Value("${app.jwt.refresh-life}")
	private int refreshLife;

	public Authentication parseAccess(String token) {
		return parse(Type.Access, token);
	}

	public Authentication parseRefresh(String token) {
		return parse(Type.Refresh, token);
	}

	public String createAccessToken(Authentication auth) {
		return generate(Type.Access, auth);
	}

	public String createRefreshToken(Authentication auth) {
		return generate(Type.Refresh, auth);
	}

	private String generate(Type type, Authentication auth) {
		// TODO Auto-generated method stub
		return null;
	}

	private Authentication parse(Type type, String token) {
		// TODO Auto-generated method stub
		return null;
	}

}
