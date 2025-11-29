package com.jdc.weekend.rest.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtTokenService tokenService;

	@Override
	protected void doFilterInternal(
			HttpServletRequest request, 
			HttpServletResponse response, 
			FilterChain filterChain)
		throws ServletException, IOException {

		var accessToken = request.getHeader("Authorization");
		
		if(StringUtils.hasLength(accessToken) && accessToken.startsWith(JwtTokenService.PREFIX)) {
			var authentication = tokenService.parseAccessToken(accessToken.substring(JwtTokenService.PREFIX.length()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		
		filterChain.doFilter(request, response);
		
	}

}
