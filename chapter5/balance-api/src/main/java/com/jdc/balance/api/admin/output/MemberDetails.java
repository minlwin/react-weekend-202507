package com.jdc.balance.api.admin.output;

import java.time.LocalDateTime;

import com.jdc.balance.model.entity.Account;

public record MemberDetails(
		int id,
		String name,
		String email,
		boolean disabled,
		LocalDateTime registeredAt,
		long ledgers,
		long entries) {

	public static MemberDetails from(Account entity) {
		return new MemberDetails(
			entity.getId(), 
			entity.getName(), 
			entity.getEmail(), 
			entity.isDisabled(), 
			entity.getRegisteredAt(), 
			entity.getLedgers().size(), 
			entity.getLedgers().stream().mapToInt(a -> a.getEntries().size()).sum()
		);
	}
}
