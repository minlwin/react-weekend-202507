package com.jdc.balance.api.member.input;

import com.jdc.balance.model.entity.Ledger.Type;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LedgerForm(
		@NotNull(message = "Please select ledger type")
		Type type,
		@NotBlank(message = "Please enter ledger code.")
		String code,
		@NotBlank(message = "Please enter ledger name.")
		String name,
		@NotBlank(message = "Please enter description.")
		String description) {

}
