package com.jdc.balance.utils.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenFilter extends OncePerRequestFilter{

	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		var authToken = request.getHeader("Authorization");
		
		System.out.println(request.getRequestURI());
		
		if(StringUtils.hasLength(authToken) && authToken.startsWith(JwtTokenProvider.PREFIX)) {
			var authentication = tokenProvider.parseAccess(authToken.substring(JwtTokenProvider.PREFIX.length()));
			
			if(null != authentication) {
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}
		
		filterChain.doFilter(request, response);
	}
}
