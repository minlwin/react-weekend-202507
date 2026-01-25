package com.jdc.balance.api.member.output;

import com.jdc.balance.model.entity.LedgerEntryItem;

public record BalanceDetailsItem(
		String item,
		int unitPrice,
		int quantity,
		String remark) {

	public int getTotal() {
		return unitPrice * quantity;
	}
	
	public static BalanceDetailsItem from(LedgerEntryItem entity) {
		return new BalanceDetailsItem(
				entity.getItem(), 
				entity.getUnitPrice(), 
				entity.getQuantity(), 
				entity.getRemark());
	}
}
