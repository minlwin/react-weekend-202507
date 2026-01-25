package com.jdc.balance.api.member.input;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

public record EntryForm(
		@NotBlank(message = "Please enter ledger code.")
		String code,
		@NotNull(message = "Please enter issue date.")
		@PastOrPresent(message = "You can't create future entry.")
		LocalDate issueAt,
		@NotBlank(message = "Please enter particular information.")
		String particular, 
		@NotEmpty(message = "Please enter entry items.")
		List<@Valid EntryFormItem> items) {

}
