package com.jdc.balance.model.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.balance.model.entity.Account;
import com.jdc.balance.model.repo.AccountRepo;
import com.jdc.balance.utils.exceptions.LoginRequiredException;

@Service
public class LoginUserService {
	
	@Autowired
	private AccountRepo repo;

	@PreAuthorize("isAuthenticated")
	@Transactional(readOnly = true)
	Account getLoginUser() {
		var username = Optional.ofNullable(SecurityContextHolder.getContext())
			.map(ctx -> ctx.getAuthentication())
			.map(auth -> auth.getName())
			.orElseThrow(() -> new LoginRequiredException());
		
		return repo.findOneByEmail(username)
				.orElseThrow(() -> new LoginRequiredException());
	}
}
