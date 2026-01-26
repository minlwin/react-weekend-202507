package com.jdc.balance.api.member.output;

import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.pk.LedgerEntryPk;

public record BalanceListItem(
		LedgerEntryPk id,
		Type ledgerType,
		String ledgerCode,
		String ledgerName,
		String particular,
		int lastBalance,
		int amount) {

	public static String [] headers() {
		return new String[] {"ID", "LEDGER", "PARTICULAR", "DEBIT", "CREDIT", "BALANCE"};
	}
	
	public String getIdCode() {
		return id.getCode();
	}
	
	public String getLedger() {
		return "%s-%s".formatted(ledgerCode, ledgerName);
	}
	
	public int getDebit() {
		return ledgerType == Type.Debit ? amount : 0;
	}
	
	public int getCredit() {
		return ledgerType == Type.Credit ? amount : 0;
	}
	
	public int getBalance() {
		return ledgerType == Type.Credit ? lastBalance + amount : lastBalance - amount;
	}
	
}
