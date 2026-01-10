package com.jdc.balance.api.admin.input;

import java.time.LocalDate;

public record MemberSearch(
		Boolean disabled,
		LocalDate from,
		LocalDate to,
		String keyword) {

}
