package com.jdc.balance.api.member.input;

import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.balance.model.entity.Account_;
import com.jdc.balance.model.entity.Ledger;
import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.Ledger_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record LedgerSearch(
		Type type,
		String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<Ledger> root, String name) {
		
		var params = new ArrayList<Predicate>();
		params.add(cb.equal(root.get(Ledger_.owner).get(Account_.email), name));
		
		if(null != type) {
			params.add(cb.equal(root.get(Ledger_.type), type));
		}
		
		if(StringUtils.hasLength(keyword)) {
			var param = "%s%%".formatted(keyword.toLowerCase());
			params.add(cb.or(
				cb.like(cb.lower(root.get(Ledger_.code)), param),
				cb.like(cb.lower(root.get(Ledger_.name)), param)
			));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}

}
