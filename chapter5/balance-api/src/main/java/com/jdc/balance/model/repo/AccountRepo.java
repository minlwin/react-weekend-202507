package com.jdc.balance.model.repo;

import java.util.Optional;

import com.jdc.balance.model.BaseRepository;
import com.jdc.balance.model.entity.Account;

public interface AccountRepo extends BaseRepository<Account, Integer> {

	Optional<Account> findOneByEmail(String email);
}
