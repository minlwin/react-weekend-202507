package com.jdc.balance.utils.dto;

import java.time.LocalDate;

import com.jdc.balance.model.entity.Ledger.Type;

public record BalanceSummary(
		LocalDate issueAt,
		Type type,
		String ledger,
		int value) {
}
