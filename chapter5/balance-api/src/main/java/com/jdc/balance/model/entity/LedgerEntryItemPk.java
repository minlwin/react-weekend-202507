package com.jdc.balance.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record LedgerEntryItemPk(
		@Column(name = "entry_id")
		int entryId,
		@Column(name = "item_seq")
		int itemSeq) {}
