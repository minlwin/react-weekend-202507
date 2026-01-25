package com.jdc.balance.api.member.output;

import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.pk.LedgerEntryPk;

public record EntryListItem(
		LedgerEntryPk id,
		String code,
		Type ledgerType,
		String ledgerName,
		String particular,
		int amount) {

}
