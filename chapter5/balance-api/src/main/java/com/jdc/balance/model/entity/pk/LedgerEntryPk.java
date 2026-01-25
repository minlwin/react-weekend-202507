package com.jdc.balance.model.entity.pk;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.jdc.balance.model.entity.LedgerEntrySeq;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record LedgerEntryPk(
		@Column(name="account_id")
		int accountId,
		@Column(name="issue_at")
		LocalDate issueAt,
		@Column(name="entry_seq")
		int entrySeq) {
	
	private static final DateTimeFormatter DF = DateTimeFormatter.ofPattern("yyyyMMdd");

	public String getCode() {
		return "%s%04d".formatted(DF.format(issueAt), entrySeq);
	}
	
	public static LedgerEntryPk from(int accountId, String code) {
		var issueAt = LocalDate.parse(code.substring(0, 8), DF);
		var entrySeq = Integer.parseInt(code.substring(8));
		return new LedgerEntryPk(accountId, issueAt, entrySeq);
	}
	
	public static LedgerEntryPk from(int accountId, LocalDate issueAt, int entrySeq) {
		return new LedgerEntryPk(accountId, issueAt, entrySeq);
	}

	public static LedgerEntryPk from(LedgerEntrySeq seq) {
		return new LedgerEntryPk(seq.getId().accountId(), seq.getId().issueAt(), seq.getSeqNumber());
	}
}
