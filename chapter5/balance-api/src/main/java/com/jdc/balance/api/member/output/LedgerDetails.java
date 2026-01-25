package com.jdc.balance.api.member.output;

import java.time.LocalDateTime;

import com.jdc.balance.model.entity.Ledger;
import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.utils.DateTimesUtils;

public record LedgerDetails(
		String code,
		String name,
		Type type,
		String description,
		int totalCount,
		int totalAmount,
		boolean deleted,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {

	public static LedgerDetails from(Ledger entity) {
		return new LedgerDetails(
				entity.getId().code(), 
				entity.getName(), 
				entity.getType(), 
				entity.getDescription(), 
				entity.getEntries().size(), 
				entity.getEntries().stream().flatMap(a -> a.getItems().stream())
					.mapToInt(a -> a.getQuantity() * a.getUnitPrice()).sum(), 
				entity.isDeleted(), 
				DateTimesUtils.toLocal(entity.getCreatedAt()), 
				DateTimesUtils.toLocal(entity.getUpdatedAt()));
	}
}
