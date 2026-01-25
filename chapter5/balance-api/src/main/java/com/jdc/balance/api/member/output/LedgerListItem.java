package com.jdc.balance.api.member.output;

import java.time.Instant;
import java.time.LocalDateTime;

import com.jdc.balance.model.entity.Ledger;
import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.LedgerPk_;
import com.jdc.balance.model.entity.Ledger_;
import com.jdc.balance.utils.DateTimesUtils;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record LedgerListItem(
		String code,
		String name,
		Type type,
		String description,
		boolean deleted,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt
		) {

	public LedgerListItem(String code, String name, Type type, String description, boolean deleted,
			Instant createdAt, Instant modifiedAt) {
		this(code, name, type, description, deleted, DateTimesUtils.toLocal(createdAt), DateTimesUtils.toLocal(modifiedAt));
	}

	public static void select(CriteriaQuery<LedgerListItem> cq, CriteriaBuilder cb, Root<Ledger> root) {
		cq.select(cb.construct(LedgerListItem.class, 
			root.get(Ledger_.id).get(LedgerPk_.code),
			root.get(Ledger_.name),
			root.get(Ledger_.type),
			root.get(Ledger_.description),
			root.get(Ledger_.deleted),
			root.get(Ledger_.createdAt),
			root.get(Ledger_.createdBy)
		));
	}
}
