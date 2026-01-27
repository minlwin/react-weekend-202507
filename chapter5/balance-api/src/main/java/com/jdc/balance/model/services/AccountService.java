package com.jdc.balance.model.services;

import java.time.LocalDateTime;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.balance.api.admin.input.MemberSearch;
import com.jdc.balance.api.admin.input.MemberStatusForm;
import com.jdc.balance.api.admin.output.MemberDetails;
import com.jdc.balance.api.admin.output.MemberListItem;
import com.jdc.balance.api.anonymous.input.SignUpForm;
import com.jdc.balance.model.entity.Account;
import com.jdc.balance.model.entity.Account_;
import com.jdc.balance.model.repo.AccountRepo;
import com.jdc.balance.utils.Nullsafe;
import com.jdc.balance.utils.dto.DataModificationResult;
import com.jdc.balance.utils.dto.PageResult;
import com.jdc.balance.utils.exceptions.BusinessException;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;

@Service
@Transactional(readOnly = true)
public class AccountService {
	
	@Autowired
	private AccountRepo accountRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Transactional
	@PreAuthorize("isAnonymous()")
	public Account create(SignUpForm form) {
		
		if(accountRepo.findOneByEmail(form.email()).isPresent()) {
			throw new BusinessException("Email already exists!");
		}
		
		var account = new Account();
		account.setName(form.name());
		account.setEmail(form.email());
		account.setPassword(passwordEncoder.encode(form.password()));
		account.setRole(Account.Role.Member);
		account.setRegisteredAt(LocalDateTime.now());
		
		return accountRepo.save(account);
	}

	public Account findByEmail(String name) {
		return accountRepo.findOneByEmail(name).orElseThrow();
	}

	@PreAuthorize("hasAuthority('Admin')")
	public PageResult<MemberListItem> search(MemberSearch search, int page, int size) {
		
		Function<CriteriaBuilder, CriteriaQuery<MemberListItem>> queryFunc = cb -> {
			var cq = cb.createQuery(MemberListItem.class);
			var root = cq.from(Account.class);
			cq.where(search.where(cb, root));
			cq.select(MemberListItem.select(cb, root));
			cq.orderBy(cb.desc(root.get(Account_.registeredAt)));
			return cq;
		};
		
		Function<CriteriaBuilder, CriteriaQuery<Long>> countFun = cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Account.class);
			cq.where(search.where(cb, root));
			cq.select(cb.count(root.get(Account_.id)));
			return cq;
		};

		return accountRepo.search(queryFunc, countFun, page, size);
	}

	@Transactional
	@PreAuthorize("hasAuthority('Admin')")
	public DataModificationResult<Integer> update(int id, MemberStatusForm form) {
		
		var entity = Nullsafe.call(accountRepo.findById(id), "Member", id);
		entity.setDisabled(form.disabled());
		
		return new DataModificationResult<>(entity.getId());
	}

	@PreAuthorize("hasAuthority('Admin')")
	public MemberDetails findById(int id) {
		return Nullsafe.call(
			accountRepo.findById(id).map(MemberDetails::from), 
			"Member", id);
	}	
}
