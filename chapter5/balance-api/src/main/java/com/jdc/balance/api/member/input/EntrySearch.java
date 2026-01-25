package com.jdc.balance.api.member.input;

import java.time.LocalDate;

import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.LedgerEntry;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record EntrySearch(
		LocalDate from,		
		LocalDate to,
		String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<LedgerEntry> root, String ownerName, Type type) {
		// TODO Auto-generated method stub
		return null;
	}

}
