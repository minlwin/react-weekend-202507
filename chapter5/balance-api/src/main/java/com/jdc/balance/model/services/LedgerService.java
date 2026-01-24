package com.jdc.balance.model.services;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.jdc.balance.api.member.input.LedgerSearch;
import com.jdc.balance.api.member.output.LedgerListItem;
import com.jdc.balance.model.PageResult;
import com.jdc.balance.model.entity.Ledger;
import com.jdc.balance.model.entity.Ledger_;
import com.jdc.balance.model.repo.LedgerRepo;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;

@Service
public class LedgerService {
	
	@Autowired
	private LedgerRepo ledgerRepo;

	@PreAuthorize("#name eq authentication.name and hasAuthority('Member')")
	public PageResult<LedgerListItem> search(String name, LedgerSearch search, int page, int size) {
		
		Function<CriteriaBuilder, CriteriaQuery<LedgerListItem>> queryFunc = cb -> {
			var cq = cb.createQuery(LedgerListItem.class);
			var root = cq.from(Ledger.class);
			LedgerListItem.select(cq, cb, root);
			cq.where(search.where(cb, root, name));
			return cq;
		};
		
		Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc = cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Ledger.class);
			cq.select(cb.count(root.get(Ledger_.code)));
			cq.where(search.where(cb, root, name));
			return cq;
		};
		
		return ledgerRepo.search(queryFunc, countFunc, page, size);
	}

}
