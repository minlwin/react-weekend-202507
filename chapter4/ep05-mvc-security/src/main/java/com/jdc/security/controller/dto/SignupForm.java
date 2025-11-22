package com.jdc.security.controller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignupForm {
	
	@NotBlank(message = "Please enter member name.")
	private String name;
	
	@NotBlank(message = "Please enter email for login.")
	private String email;
	
	@NotBlank(message = "Please enter password.")
	private String password;
}
