package com.jdc.balance.model.services;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.balance.model.entity.LedgerEntrySeq;
import com.jdc.balance.model.entity.pk.EntrySeqPk;
import com.jdc.balance.model.entity.pk.LedgerEntryPk;
import com.jdc.balance.model.repo.LedgerEntrySeqRepo;

@Service
public class EntrySeqGenerator {
	
	@Autowired
	private LedgerEntrySeqRepo repo;
	
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public LedgerEntryPk next(LocalDate issueAt, int accountId) {
		var id = EntrySeqPk.from(accountId, issueAt);
		
		var entity = repo.findById(id).orElseGet(() -> {
			var seq = new LedgerEntrySeq();
			seq.setId(id);
			return repo.save(seq);
		});
		
		entity.setSeqNumber(entity.getSeqNumber() + 1);
		
		return LedgerEntryPk.from(entity);
	}
}
