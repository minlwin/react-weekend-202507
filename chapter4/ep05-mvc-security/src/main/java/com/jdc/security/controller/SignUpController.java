package com.jdc.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jdc.security.controller.dto.SignupForm;
import com.jdc.security.model.AccountService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("signup")
public class SignUpController {
	
	
	@Autowired
	private AccountService service;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private SecurityContextRepository securityContextRepository;

	@GetMapping
	String index() {
		return "signup";
	}
	
	@PostMapping
	String signUp(
			HttpServletRequest request,
			HttpServletResponse response,
			@ModelAttribute @Validated SignupForm form, 
			BindingResult result) {
		
		if(result.hasErrors()) {
			return "signup";
		}
		
		// Create User
		Authentication authentication = service.signUp(form);

		// Programmatic Sign In
		authentication = authenticationManager.authenticate(authentication);
		
		// Stored Login Result for next requests
		var securityContext = SecurityContextHolder.getContext();
		securityContext.setAuthentication(authentication);
		
		securityContextRepository.saveContext(securityContext, request, response);
		
		// Redirect to Home		
		return "redirect:/";
	}
	
	@ModelAttribute
	SignupForm form() {
		return new SignupForm();
	}
}
