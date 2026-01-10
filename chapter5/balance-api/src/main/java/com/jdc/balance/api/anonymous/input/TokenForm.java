package com.jdc.balance.api.anonymous.input;

import jakarta.validation.constraints.NotBlank;

public record TokenForm(
		@NotBlank(message = "Please enter token.") 
		String token) {
}
