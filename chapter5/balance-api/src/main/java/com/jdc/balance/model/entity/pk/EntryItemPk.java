package com.jdc.balance.model.entity.pk;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record EntryItemPk(
		@Column(name="account_id")
		int accountId,
		@Column(name="issue_at")
		LocalDate issueAt,
		@Column(name="entry_seq")
		int entrySeq,
		@Column(name="item_seq")
		int itemSeq) {
	
	public static EntryItemPk from(LedgerEntryPk entryId, int seq) {
		return new EntryItemPk(
				entryId.accountId(), 
				entryId.issueAt(), 
				entryId.entrySeq(), 
				seq);
	}
}
