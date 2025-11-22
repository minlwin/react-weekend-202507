package com.jdc.security.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.security.controller.dto.SignupForm;
import com.jdc.security.model.entity.Account;
import com.jdc.security.model.entity.Account.Role;
import com.jdc.security.model.repo.AccountRepo;

@Service
public class AccountService {

	@Autowired
	private AccountRepo accountRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Transactional
	public Authentication signUp(SignupForm form) {
		
		var account = new Account();
		account.setName(form.getName());
		account.setRole(Role.Member);
		account.setEmail(form.getEmail());
		account.setPassword(passwordEncoder.encode(form.getPassword()));
		accountRepo.save(account);
		
		return UsernamePasswordAuthenticationToken.unauthenticated(form.getEmail(), form.getPassword());
	}
}
