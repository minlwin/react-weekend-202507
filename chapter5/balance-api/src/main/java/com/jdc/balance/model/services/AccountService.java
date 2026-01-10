package com.jdc.balance.model.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.balance.api.anonymous.input.SignUpForm;
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

	
}
