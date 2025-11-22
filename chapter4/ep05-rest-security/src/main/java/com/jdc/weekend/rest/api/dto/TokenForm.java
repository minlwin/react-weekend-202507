package com.jdc.weekend.rest.api.dto;

import jakarta.validation.constraints.NotBlank;

public record TokenForm(
		@NotBlank(message = "Please enter refresh token.")
		String token) {

}
