package com.jdc.balance.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record LedgerPk(
		String code,
		@Column(name = "account_id")
		int accountId) {

}
