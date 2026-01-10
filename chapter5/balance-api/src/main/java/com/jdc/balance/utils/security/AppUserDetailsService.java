package com.jdc.balance.utils.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jdc.balance.model.repo.AccountRepo;

@Service
public class AppUserDetailsService implements UserDetailsService{

	@Autowired
	private AccountRepo accountRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return accountRepo.findOneByEmail(username)
				.map(account -> User.builder()
						.username(username)
						.password(account.getPassword())
						.authorities(account.getRole().name())
						.disabled(account.isDisabled())
						.build())
				.orElseThrow(() -> new UsernameNotFoundException(username));
	}

}
