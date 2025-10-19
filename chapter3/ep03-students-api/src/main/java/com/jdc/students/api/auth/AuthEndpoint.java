package com.jdc.students.api.auth;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.students.api.auth.input.SignInForm;
import com.jdc.students.api.auth.input.SignUpForm;
import com.jdc.students.api.auth.output.SignInResponse;
import com.jdc.students.model.dto.Role;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("auth")
public class AuthEndpoint {

	@PostMapping("signin")
	SignInResponse signIn(@Validated @RequestBody SignInForm form) {
		
		log.debug("Input Data : {}", form);
		
		return new SignInResponse("User", form.email(), Role.Admin, "Access Token", "Refresh Token");
	}

	@PostMapping("signup")
	SignInResponse signUp(@RequestBody SignUpForm form) {
		return null;
	}
}
