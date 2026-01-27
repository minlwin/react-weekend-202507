package com.jdc.balance.api.member.input;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.balance.model.entity.Account_;
import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.LedgerEntry;
import com.jdc.balance.model.entity.LedgerEntry_;
import com.jdc.balance.model.entity.Ledger_;
import com.jdc.balance.model.entity.pk.LedgerEntryPk_;
import com.jdc.balance.model.entity.pk.LedgerPk_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record EntrySearch(
		LocalDate from,		
		LocalDate to,
		String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<LedgerEntry> root, String ownerName, Type type) {
		
		var params = new ArrayList<Predicate>();
		params.add(cb.equal(root.get(LedgerEntry_.ledger).get(Ledger_.owner).get(Account_.email), ownerName));
		params.add(cb.equal(root.get(LedgerEntry_.ledger).get(Ledger_.type), type));
		
		if(null != from) {
			params.add(cb.greaterThanOrEqualTo(root.get(LedgerEntry_.id).get(LedgerEntryPk_.issueAt), from));
		}
		
		if(null != to) {
			params.add(cb.lessThanOrEqualTo(root.get(LedgerEntry_.id).get(LedgerEntryPk_.issueAt), to));
		}
		
		if(StringUtils.hasLength(keyword)) {
			var param = keyword.toLowerCase().concat("%");
			var ledger = root.get(LedgerEntry_.ledger);
			params.add(cb.or(
				cb.like(cb.lower(root.get(LedgerEntry_.particular)), param),
				cb.like(cb.lower(ledger.get(Ledger_.id).get(LedgerPk_.code)), param),
				cb.like(cb.lower(ledger.get(Ledger_.name)), param)
			));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}

}
