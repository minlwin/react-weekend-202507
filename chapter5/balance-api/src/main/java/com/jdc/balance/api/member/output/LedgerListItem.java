package com.jdc.balance.api.member.output;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

import com.jdc.balance.model.entity.Ledger;
import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.Ledger_;

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
		this(code, name, type, description, deleted, toLocal(createdAt), toLocal(modifiedAt));
	}
	
	public static LocalDateTime toLocal(Instant instant) {
		if(null != instant) {
			return LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
		}
		return null;
	}

	public static void select(CriteriaQuery<LedgerListItem> cq, CriteriaBuilder cb, Root<Ledger> root) {
		cq.select(cb.construct(LedgerListItem.class, 
			root.get(Ledger_.code),
			root.get(Ledger_.name),
			root.get(Ledger_.type),
			root.get(Ledger_.description),
			root.get(Ledger_.deleted),
			root.get(Ledger_.createdAt),
			root.get(Ledger_.createdBy)
		));
	}
}
