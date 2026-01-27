package com.jdc.balance.api.member.output;

import java.time.LocalDate;
import java.util.List;

import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.LedgerEntry;
import com.jdc.balance.model.entity.pk.LedgerEntryPk;

public record BalanceDetails(		
		LedgerEntryPk id,
		String code,
		Type ledgerType,
		String ledgerName,
		LocalDate issueDate,
		String particular,
		int lastBalance,
		List<BalanceDetailsItem> items,
		boolean editable) {

	public int getCount() {
		return items.stream().mapToInt(a -> a.quantity()).sum();
	}
	
	public int getAmount() {
		return items.stream().mapToInt(a -> a.getTotal()).sum();
	}
	
	public static BalanceDetails from(LedgerEntry entity, LocalDate cutOffDate) {
		return new BalanceDetails(
				entity.getId(), 
				entity.getLedger().getId().code(), 
				entity.getLedger().getType(), 
				entity.getLedger().getName(), 
				entity.getId().issueAt(), 
				entity.getParticular(), 
				entity.getItems().stream().mapToInt(a -> a.getQuantity() * a.getUnitPrice()).sum(), 
				entity.getItems().stream().map(BalanceDetailsItem::from).toList(), 
				entity.getId().issueAt().isBefore(cutOffDate));
	}
}
