package com.jdc.balance.api.member.input;

import java.time.LocalDate;
import java.util.ArrayList;

import com.jdc.balance.model.entity.Account_;
import com.jdc.balance.model.entity.LedgerEntry;
import com.jdc.balance.model.entity.LedgerEntry_;
import com.jdc.balance.model.entity.Ledger_;
import com.jdc.balance.model.entity.pk.LedgerEntryPk_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record BalanceSearch(
		LocalDate from,
		LocalDate to) {

	public Predicate[] where(CriteriaBuilder cb, Root<LedgerEntry> root, String ownerName) {
		
		var params = new ArrayList<>();
		params.add(cb.equal(root.get(LedgerEntry_.ledger).get(Ledger_.owner).get(Account_.email), ownerName));
		
		if(null != from) {
			params.add(cb.greaterThanOrEqualTo(root.get(LedgerEntry_.id).get(LedgerEntryPk_.issueAt), from));
		}
		
		if(null != to) {
			params.add(cb.lessThanOrEqualTo(root.get(LedgerEntry_.id).get(LedgerEntryPk_.issueAt), to));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}

}
