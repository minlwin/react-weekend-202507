package com.jdc.balance.api.member.input;

import jakarta.validation.constraints.NotBlank;

public record LedgerUpdateForm(
		@NotBlank(message = "Please enter ledger name.")
		String name,
		@NotBlank(message = "Please enter description.")
		String description) {

}
