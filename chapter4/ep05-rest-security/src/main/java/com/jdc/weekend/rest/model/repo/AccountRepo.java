package com.jdc.weekend.rest.model.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jdc.weekend.rest.model.entity.Account;

public interface AccountRepo extends JpaRepository<Account, Integer>{

	Optional<Account> findOneByEmail(String email);
}
