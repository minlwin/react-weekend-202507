package com.jdc.balance.model.services;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.balance.api.member.input.LedgerForm;
import com.jdc.balance.api.member.input.LedgerSearch;
import com.jdc.balance.api.member.input.LedgerUpdateForm;
import com.jdc.balance.api.member.output.LedgerDetails;
import com.jdc.balance.api.member.output.LedgerListItem;
import com.jdc.balance.model.DataModificationResult;
import com.jdc.balance.model.PageResult;
import com.jdc.balance.model.entity.Ledger;
import com.jdc.balance.model.entity.Ledger_;
import com.jdc.balance.model.entity.pk.LedgerPk;
import com.jdc.balance.model.repo.LedgerRepo;
import com.jdc.balance.utils.Nullsafe;
import com.jdc.balance.utils.dto.DeleteStatusForm;
import com.jdc.balance.utils.exceptions.BusinessException;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;

@Service
@Transactional(readOnly = true)
public class LedgerService {
	
	@Autowired
	private LedgerRepo ledgerRepo;
	@Autowired
	private LoginUserService loginUserService;

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
			cq.select(cb.count(root.get(Ledger_.id)));
			cq.where(search.where(cb, root, name));
			return cq;
		};
		
		return ledgerRepo.search(queryFunc, countFunc, page, size);
	}

	public LedgerDetails findById(String code) {
		
		var loginUser = loginUserService.getLoginUser();
		var pk = new LedgerPk(code, loginUser.getId());
		
		return Nullsafe.call(ledgerRepo.findById(pk).map(LedgerDetails::from), "Ledger", code);
	}

	@Transactional
	public DataModificationResult<String> create(LedgerForm form) {
		var loginUser = loginUserService.getLoginUser();
		var pk = new LedgerPk(form.code(), loginUser.getId());
		
		if(ledgerRepo.findById(pk).isPresent()) {
			throw new BusinessException("%s is already used. Please change another code.".formatted(form.code()));
		}
		
		var entity = new Ledger();
		entity.setId(pk);
		entity.setOwner(loginUser);
		entity.setType(form.type());
		entity.setName(form.name());
		entity.setDescription(form.description());
		
		ledgerRepo.save(entity);
		
		return new DataModificationResult<String>(pk.code());
	}

	@Transactional
	public DataModificationResult<String> update(String code, LedgerUpdateForm form) {
		var loginUser = loginUserService.getLoginUser();
		var pk = new LedgerPk(code, loginUser.getId());
		
		var entity = Nullsafe.call(ledgerRepo.findById(pk), "Ledger", code);
		
		entity.setName(form.name());
		entity.setDescription(form.description());
		
		return new DataModificationResult<String>(pk.code());
	}

	@Transactional
	public DataModificationResult<String> update(String code, DeleteStatusForm form) {
		var loginUser = loginUserService.getLoginUser();
		var pk = new LedgerPk(code, loginUser.getId());
		var entity = Nullsafe.call(ledgerRepo.findById(pk), "Ledger", code);
		entity.setDeleted(form.deleted());
		return new DataModificationResult<String>(pk.code());
	}

}
