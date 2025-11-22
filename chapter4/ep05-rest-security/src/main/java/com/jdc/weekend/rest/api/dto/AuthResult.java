package com.jdc.weekend.rest.api.dto;

import com.jdc.weekend.rest.model.entity.Account;
import com.jdc.weekend.rest.model.entity.Account.Role;

public record AuthResult(
		String name,
		String email,
		Role role,
		String accessToken,
		String refreshToken) {
	
	public static Builder builder() {
		return new Builder();
	}

	public static Builder withAccount(Account account) {
		return new Builder()
				.name(account.getName())
				.email(account.getEmail())
				.role(account.getRole());
	}

	public static class Builder {
		private Builder() {
		}
		
		private String name;
		private String email;
		private Role role;
		private String accessToken;
		private String refreshToken;
		
		public AuthResult build() {
			return new AuthResult(name, email, role, accessToken, refreshToken);
		}

		public Builder name(String name) {
			this.name = name;
			return this;
		}

		public Builder email(String email) {
			this.email = email;
			return this;
		}

		public Builder role(Role role) {
			this.role = role;
			return this;
		}

		public Builder accessToken(String accessToken) {
			this.accessToken = accessToken;
			return this;
		}

		public Builder refreshToken(String refreshToken) {
			this.refreshToken = refreshToken;
			return this;
		}
	}
}
