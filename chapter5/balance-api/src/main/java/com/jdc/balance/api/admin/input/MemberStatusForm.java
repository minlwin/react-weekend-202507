package com.jdc.balance.api.admin.input;

import jakarta.validation.constraints.NotNull;

public record MemberStatusForm(
		@NotNull(message = "Please select member status.")
		Boolean disabled) {

}
