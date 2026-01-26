package com.jdc.balance.api.member.output;

import com.jdc.balance.model.entity.Ledger;
import com.jdc.balance.model.entity.Ledger.Type;

public record LedgerUploadItem(
		String code,
		Type type,
		String name,
		String description,
		Status status,
		String message) {
	
	public enum Status {
		Created, Skipped, Error
	}

	public static LedgerUploadItem from(Ledger entity, Status status, String message) {
		return new LedgerUploadItem(entity.getId().code(), entity.getType(), entity.getName(), entity.getDescription(), status, message);
	}

}
