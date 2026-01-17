package com.jdc.balance;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.security.web.authentication.AuthenticationFilter;

import com.jdc.balance.model.BaseRepositoryImpl;
import com.jdc.balance.utils.debug.DebugFilter;
import com.jdc.balance.utils.exceptions.handlers.SecurityExceptionHandler;
import com.jdc.balance.utils.security.JwtTokenFilter;

@Configuration
@EnableJpaAuditing
@EnableMethodSecurity
@EnableJpaRepositories(repositoryBaseClass = BaseRepositoryImpl.class)
public class SecurityConfig {
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) {
		
		http.csrf(csrf -> csrf.disable());
		http.cors(Customizer.withDefaults());
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.authorizeHttpRequests(req -> {
			req.requestMatchers("/auth/**").permitAll();
			req.requestMatchers("/admin/**").hasAuthority("Admin");
			req.requestMatchers("/member/**").hasAuthority("Member");
			req.anyRequest().authenticated();
		});
		
		http.exceptionHandling(exception -> {
			exception.accessDeniedHandler(securityExceptionHandler());
			exception.authenticationEntryPoint(securityExceptionHandler());
		});
		
		http.addFilterBefore(new DebugFilter(), AuthenticationFilter.class);
		http.addFilterAfter(jwtTokenFilter(), ExceptionTranslationFilter.class);
		
		return http.build();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	SecurityExceptionHandler securityExceptionHandler() {
		return new SecurityExceptionHandler();
	}
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) {
		return authenticationConfiguration.getAuthenticationManager();
	}
	
	@Bean
	JwtTokenFilter jwtTokenFilter() {
		return new JwtTokenFilter();
	}
}
