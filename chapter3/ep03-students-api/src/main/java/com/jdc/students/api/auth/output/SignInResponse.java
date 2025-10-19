package com.jdc.students.api.auth.output;

import com.jdc.students.model.dto.Role;

public record SignInResponse(
		String name,
		String email,
		Role role,
		String accessToken,
		String refreshToken) {

}
