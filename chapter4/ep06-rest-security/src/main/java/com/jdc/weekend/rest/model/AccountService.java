package com.jdc.weekend.rest.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.weekend.rest.api.dto.SignUpForm;
import com.jdc.weekend.rest.exception.BusinessException;
import com.jdc.weekend.rest.model.entity.Account;
import com.jdc.weekend.rest.model.entity.Account.Role;
import com.jdc.weekend.rest.model.repo.AccountRepo;

@Service
public class AccountService {

	@Autowired
	private AccountRepo accountRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Transactional
	public Authentication signUp(SignUpForm form) {
		
		if(accountRepo.countByEmail(form.email()) > 0) {
			throw new BusinessException("Your email is already used via other account.");
		}
		
		var account = new Account();
		account.setName(form.name());
		account.setRole(Role.Member);
		account.setEmail(form.email());
		account.setPassword(passwordEncoder.encode(form.password()));
		accountRepo.save(account);
		
		return UsernamePasswordAuthenticationToken.unauthenticated(form.email(), form.password());
	}

	public Account findByEmail(String name) {
		return accountRepo.findOneByEmail(name).orElseThrow();
	}
}
