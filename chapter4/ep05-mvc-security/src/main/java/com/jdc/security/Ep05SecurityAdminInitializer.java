package com.jdc.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.security.model.entity.Account;
import com.jdc.security.model.entity.Account.Role;
import com.jdc.security.model.repo.AccountRepo;

@Configuration
public class Ep05SecurityAdminInitializer {
	
	@Autowired
	private AccountRepo accountRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Transactional
	@EventListener(value = ContextRefreshedEvent.class)
	void initializeAdmin() {
		if(accountRepo.count() == 0L) {
			var account = new Account();
			account.setName("Admin User");
			account.setEmail("admin@gmail.com");
			account.setRole(Role.Admin);
			account.setPassword(passwordEncoder.encode("password"));
			accountRepo.save(account);
		}
	}
}
