package com.jdc.balance.api.admin.input;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.balance.model.entity.Account;
import com.jdc.balance.model.entity.Account.Role;
import com.jdc.balance.model.entity.Account_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record MemberSearch(
		Boolean disabled,
		LocalDate from,
		LocalDate to,
		String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<Account> root) {
		
		var params = new ArrayList<Predicate>();
		params.add(cb.equal(root.get(Account_.role), Role.Member));
		
		if(null != disabled) {
			params.add(cb.equal(root.get(Account_.disabled), disabled));
		}
		
		if(null != from) {
			params.add(cb.greaterThanOrEqualTo(root.get(Account_.registeredAt), from.atStartOfDay()));
		}
		
		if(null != to) {
			params.add(cb.lessThan(root.get(Account_.registeredAt), to.plusDays(1).atStartOfDay()));
		}
		
		if(StringUtils.hasLength(keyword)) {
			params.add(cb.like(cb.lower(root.get(Account_.name)), keyword.toLowerCase().concat("%")));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}

}
