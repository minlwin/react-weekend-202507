package com.jdc.balance.api;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.balance.api.input.SignInForm;
import com.jdc.balance.api.input.SignUpForm;
import com.jdc.balance.api.input.TokenForm;
import com.jdc.balance.api.output.AuthResult;

@RestController
@RequestMapping("auth")
public class AuthApi {

	@PostMapping("signin")
	AuthResult signIn(@Validated @RequestBody SignInForm form) {
		return null;
	}
	
	@PostMapping("signup")
	AuthResult signUp(@Validated @RequestBody SignUpForm form) {
		return null;
	}
	
	@PostMapping("refresh")
	AuthResult refresh(@Validated @RequestBody TokenForm form) {
		return null;
	}
}
