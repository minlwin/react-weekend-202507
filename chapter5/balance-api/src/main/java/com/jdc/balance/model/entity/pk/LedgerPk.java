package com.jdc.balance.model.entity.pk;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record LedgerPk(
		String code,
		@Column(name = "account_id")
		int accountId) {

	public static LedgerPk from(int accountId, String code) {
		return new LedgerPk(code, accountId);
	}
}
