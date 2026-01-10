package com.jdc.balance.utils.security;

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

import com.jdc.balance.utils.exceptions.TokenExpirationException;
import com.jdc.balance.utils.exceptions.TokenInvalidationException;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

@Service
public class JwtTokenProvider {
	
	public enum Type {
		Access, Refresh
	}
	
	public static final String PREFIX = "Bearer ";
	
	@Value("${app.jwt.issuer}")
	private String issuer;
	@Value("${app.jwt.access-life}")
	private int accessLife;
	@Value("${app.jwt.refresh-life}")
	private int refreshLife;
	
	private SecretKey key = Jwts.SIG.HS512.key().build();

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
		
		var issueAt = new Date();
		
		return Jwts.builder()
				.subject(auth.getName())
				.claim("rol", auth.getAuthorities().stream()
						.map(a -> a.getAuthority())
						.collect(Collectors.joining(",")))
				.claim("type", type.name())
				.issuer(issuer)
				.issuedAt(issueAt)
				.expiration(getExpiration(type, issueAt))
				.signWith(key)
				.compact();
	}

	private Authentication parse(Type type, String token) {
		
		try {
			
			var payload = Jwts.parser()
				.requireIssuer(issuer)
				.verifyWith(key)
				.build()
				.parseSignedClaims(token).getPayload();
			
			if(!type.name().equals(payload.get("type", String.class))) {
				throw new TokenInvalidationException("Invalid token type.");
			}
			
			return UsernamePasswordAuthenticationToken.authenticated(
					payload.getSubject(), 
					null, 
					Arrays.stream(payload.get("rol", String.class).split(","))
						.map(a -> new SimpleGrantedAuthority(a)).toList());
			
		} catch (ExpiredJwtException e) {
			if(type == Type.Access) {
				throw new TokenExpirationException();
			}
			
			throw new TokenInvalidationException("Refresh token is expired.");
		} catch (JwtException e) {
			throw new TokenInvalidationException(e);
		}
	}

	private Date getExpiration(Type type, Date issueAt) {
		var calendar = Calendar.getInstance();
		calendar.setTime(issueAt);
		calendar.add(Calendar.MINUTE, type == Type.Access ? accessLife : refreshLife);
		return calendar.getTime();
	}

}
