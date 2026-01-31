package com.jdc.balance.api.member.output;

public record BalanceData(
		String label,
		int debit,
		int credit) {	
}
