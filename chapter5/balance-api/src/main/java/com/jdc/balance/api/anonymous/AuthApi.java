package com.jdc.balance.api.anonymous;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.balance.api.anonymous.input.SignInForm;
import com.jdc.balance.api.anonymous.input.SignUpForm;
import com.jdc.balance.api.anonymous.input.TokenForm;
import com.jdc.balance.api.anonymous.output.AuthResult;
import com.jdc.balance.model.services.AccountService;
import com.jdc.balance.utils.security.JwtTokenProvider;

@RestController
@RequestMapping("auth")
public class AuthApi {
	
	@Autowired
	private AccountService accountService;
	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("signin")
	AuthResult signIn(@Validated @RequestBody SignInForm form) {
		return signIn(form.authentication());
	}
	
	@PostMapping("signup")
	AuthResult signUp(@Validated @RequestBody SignUpForm form) {
		var account = accountService.create(form);
		return signIn(UsernamePasswordAuthenticationToken.unauthenticated(account.getEmail(), form.password()));
	}
	
	@PostMapping("refresh")
	AuthResult refresh(@Validated @RequestBody TokenForm form) {
		var auth = tokenProvider.parseRefresh(form.token());
		return getResult(auth);
	}
	
	private AuthResult signIn(Authentication authentication) {
		var auth = authenticationManager.authenticate(authentication);
		return getResult(auth);
	}

	private AuthResult getResult(Authentication auth) {
		var account = accountService.findByEmail(auth.getName());
		return AuthResult.with(account)
				.accessToken(tokenProvider.createAccessToken(auth))
				.refreshToken(tokenProvider.createRefreshToken(auth))
				.build();
	}

}
