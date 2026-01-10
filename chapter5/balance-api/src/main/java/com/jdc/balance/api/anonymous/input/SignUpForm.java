package com.jdc.balance.api.anonymous.input;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignUpForm(
		@NotBlank(message = "Please enter your name.")
		String name,
		@Email(message = "Please enter valid email.")
		@NotBlank(message = "Please enter email for login.")
		String email,
		@NotBlank(message = "Please enter password.")
		String password) {

}
