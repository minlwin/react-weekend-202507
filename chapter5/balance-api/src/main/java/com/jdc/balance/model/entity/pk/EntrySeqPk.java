package com.jdc.balance.model.entity.pk;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record EntrySeqPk(
		@Column(name="account_id")
		int accountId,
		@Column(name="issue_at")
		LocalDate issueAt) {

	public static EntrySeqPk from(int accountId, LocalDate issueAt) {
		return new EntrySeqPk(accountId, issueAt);
	}
}
