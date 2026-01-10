package com.jdc.balance.api.admin.output;

import java.time.LocalDateTime;

public record MemberListItem(
		int id,
		String name,
		String email,
		boolean disabled,
		LocalDateTime registeredAt) {

}
