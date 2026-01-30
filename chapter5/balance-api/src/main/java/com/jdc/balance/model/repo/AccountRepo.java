package com.jdc.balance.model.repo;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jdc.balance.model.BaseRepository;
import com.jdc.balance.model.entity.Account;
import com.jdc.balance.model.entity.Account.Role;

public interface AccountRepo extends BaseRepository<Account, Integer> {

	Optional<Account> findOneByEmail(String email);
	
	@Query("select min(m.registeredAt) from Account m where m.role = :role")
	Optional<LocalDateTime> findFirstRegistration(@Param("role") Role role);
	
	@Query("select max(m.registeredAt) from Account m where m.role = :role")
	Optional<LocalDateTime> findLastRegistration(@Param("role") Role role);
	
}
