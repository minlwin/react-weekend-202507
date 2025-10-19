package com.jdc.students.api.auth.output;

import com.jdc.students.model.Role;

public record SignInResponse(
		String name,
		String email,
		Role role,
		String accessToken,
		String refreshToken) {

}
