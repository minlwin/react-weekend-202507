package com.jdc.weekend.rest.api;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.weekend.rest.api.dto.AuthResult;
import com.jdc.weekend.rest.api.dto.SignInForm;
import com.jdc.weekend.rest.api.dto.SignUpForm;
import com.jdc.weekend.rest.api.dto.TokenForm;
import com.jdc.weekend.rest.model.AccountService;
import com.jdc.weekend.rest.security.JwtTokenService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthApi {
	
	private final AuthenticationManager authenticationManager;
	private final AccountService accountService;
	private final JwtTokenService tokenService;
	
	@PostMapping("signin")
	AuthResult signIn(@RequestBody @Validated SignInForm form) {
		var authentication = authenticationManager.authenticate(form.authentication());
		return getResult(authentication);
	}

	@PostMapping("signup")
	AuthResult signUp(@RequestBody @Validated SignUpForm form) {
		var authentication = accountService.signUp(form);
		authentication = authenticationManager.authenticate(authentication);	
		return getResult(authentication);
	}
	
	@PostMapping("refresh")
	AuthResult refresh(@RequestBody @Validated TokenForm form) {
		var authentication = tokenService.parseRefreshToken(form.token());
		return getResult(authentication);
	}
	
	private AuthResult getResult(Authentication authentication) {
		var account = accountService.findByEmail(authentication.getName());
		return AuthResult.withAccount(account)
				.accessToken(tokenService.generateAccessToken(authentication))
				.refreshToken(tokenService.generateRefreshToken(authentication))
				.build();
	}

	
}
