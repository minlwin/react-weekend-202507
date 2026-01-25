package com.jdc.balance.utils.dto;

import jakarta.validation.constraints.NotNull;

public record DeleteStatusForm(
		@NotNull(message = "Please select delete status.")
		Boolean deleted) {

}
