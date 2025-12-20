package com.jdc.balance.api.output;

import com.jdc.balance.model.entity.Account.Role;

public record AuthResult(
		String name,
		String email,
		Role role,
		String accessToken,
		String refreshToken) {

}
