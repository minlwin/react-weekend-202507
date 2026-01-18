package com.jdc.balance.api.admin.output;

import java.time.LocalDateTime;

import com.jdc.balance.model.entity.Account;
import com.jdc.balance.model.entity.Account_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Selection;

public record MemberListItem(
		int id,
		String name,
		String email,
		boolean disabled,
		LocalDateTime registeredAt) {

	public static Selection<MemberListItem> select(CriteriaBuilder cb, Root<Account> root) {
		return cb.construct(
			MemberListItem.class,
			root.get(Account_.id),
			root.get(Account_.name),
			root.get(Account_.email),
			root.get(Account_.disabled),
			root.get(Account_.registeredAt)
		);
	}

}
