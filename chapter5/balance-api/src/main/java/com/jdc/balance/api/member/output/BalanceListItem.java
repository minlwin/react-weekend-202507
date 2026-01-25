package com.jdc.balance.api.member.output;

import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.pk.LedgerEntryPk;

public record BalanceListItem(
		LedgerEntryPk id,
		String code,
		Type ledgerType,
		String ledgerName,
		String particular,
		int lastBalance,
		int amount) {

	
}
