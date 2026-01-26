package com.jdc.balance.api.member.output;

import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.pk.LedgerEntryPk;

public record EntryListItem(
		LedgerEntryPk id,
		Type ledgerType,
		String ledgerCode,
		String ledgerName,
		String particular,
		int amount) {

	public static String [] headers() {
		return new String[]{
			"ID", "TYPE", "LEDGER CODE", "LEDGER NAME", "PARTICULAR", "AMOUNT"
		};
	}
}
