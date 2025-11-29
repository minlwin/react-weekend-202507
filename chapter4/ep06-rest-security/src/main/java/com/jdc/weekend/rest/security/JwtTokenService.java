package com.jdc.weekend.rest.security;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.jdc.weekend.rest.exception.InvalidTokenException;
import com.jdc.weekend.rest.exception.TokenExpirationException;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

@Service
public class JwtTokenService {
	
	public static final String PREFIX = "Bearer ";
	private SecretKey key = Jwts.SIG.HS256.key().build();
	
	@Value("${app.jwt.issuer}")
	private String issuer;
	@Value("${app.jwt.access-life}")
	private int accessLife;
	@Value("${app.jwt.refresh-life}")
	private int refreshLife;
	
	public enum Type {
		Access, Refresh
	}

	public Authentication parseRefreshToken(String token) {
		return parseToken(token, Type.Refresh);
	}

	public Authentication parseAccessToken(String token) {
		return parseToken(token, Type.Access);
	}

	public String generateAccessToken(Authentication authentication) {
		return generateToken(authentication, Type.Access);
	}

	public String generateRefreshToken(Authentication authentication) {
		return generateToken(authentication, Type.Refresh);
	}
	
	private String generateToken(Authentication authentication, Type type) {
		
		var issueAt = new Date();
		var calendar = Calendar.getInstance();
		calendar.setTime(issueAt);
		
		if(type == Type.Access) {
			calendar.add(Calendar.MINUTE, accessLife);
		} else if (type == Type.Refresh) {
			calendar.add(Calendar.MINUTE, refreshLife);
		}
		
		return Jwts.builder()
			.subject(authentication.getName())
			.issuer(issuer)
			.issuedAt(issueAt)
			.expiration(calendar.getTime())
			.claim("type", type)
			.claim("role", authentication.getAuthorities().stream()
					.map(a -> a.getAuthority())
					.collect(Collectors.joining(",")))
			.signWith(key)
			.compact();
	}
	
	private Authentication parseToken(String token, Type type) {
		
		try {
			var payload = Jwts.parser()
					.verifyWith(key)
					.requireIssuer(issuer)
					.build()
				.parseSignedClaims(token).getPayload();
			
			var tokenType = payload.get("type", String.class);
			if(!type.name().equals(tokenType)) {
				throw new InvalidTokenException("Invalid Token Type");
			}
			
			var username = payload.getSubject();
			var roles = Arrays.stream(payload.get("role", String.class).split(","))
					.map(rol -> new SimpleGrantedAuthority(rol))
					.toList();
			
			return UsernamePasswordAuthenticationToken.authenticated(username, null, roles);
		} catch (ExpiredJwtException e) {
			throw new TokenExpirationException(e);
		} catch (JwtException e) {
			throw new InvalidTokenException(e);
		}
	}

}
