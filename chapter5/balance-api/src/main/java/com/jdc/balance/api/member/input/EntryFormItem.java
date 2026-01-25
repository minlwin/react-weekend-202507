package com.jdc.balance.api.member.input;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EntryFormItem(
		@NotBlank(message = "Please enter item name.")
		String item,
		@NotNull(message = "Please enter unit price.")
		Integer unitPrice,
		@NotNull(message = "Please enter quantity.")
		Integer quantity,
		String remark) {

}
