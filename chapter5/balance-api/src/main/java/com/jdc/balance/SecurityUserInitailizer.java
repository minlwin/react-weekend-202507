package com.jdc.balance;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.jdc.balance.model.entity.Account;
import com.jdc.balance.model.entity.Account.Role;
import com.jdc.balance.model.repo.AccountRepo;

@Configuration
public class SecurityUserInitailizer {
	
	@Value("${app.admin.username}")
	private String username;
	@Value("${app.admin.password}")
	private String password;

	@Bean
	ApplicationRunner initailizer(AccountRepo repo, PasswordEncoder passwordEncoder) {
		return _ -> {
			if(repo.count() == 0L) {
				var admin = new Account();
				admin.setName("Admin User");
				admin.setEmail(username);
				admin.setPassword(passwordEncoder.encode(password));
				admin.setRole(Role.Admin);
				repo.save(admin);
			}
		};
	}
}
