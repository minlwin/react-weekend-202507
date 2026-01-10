package com.jdc.balance.model.services;

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
import com.jdc.balance.model.DataModificationResult;
import com.jdc.balance.model.PageResult;
import com.jdc.balance.model.entity.Account;
import com.jdc.balance.model.repo.AccountRepo;
import com.jdc.balance.utils.exceptions.BusinessException;

@Service
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
		
		return accountRepo.save(account);
	}

	@Transactional(readOnly = true)
	public Account findByEmail(String name) {
		return accountRepo.findOneByEmail(name).orElseThrow();
	}

	@PreAuthorize("hasAuthority('Admin')")
	public PageResult<MemberListItem> search(MemberSearch search) {
		// TODO Auto-generated method stub
		return null;
	}

	@PreAuthorize("hasAuthority('Admin')")
	public DataModificationResult<Integer> update(MemberStatusForm form) {
		// TODO Auto-generated method stub
		return null;
	}

	@PreAuthorize("hasAuthority('Admin')")
	public MemberDetails findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}	
}
