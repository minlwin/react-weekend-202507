package com.jdc.balance.model.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.repo.LedgerEntryRepo;
import com.jdc.balance.utils.dto.CalculationRequiredEvent;

@Service
public class CalculationEventListener {

	@Autowired
	private CutoffDateManager cutoffDateManager;
	@Autowired
	private LedgerEntryRepo entryRepo;
	
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
	public void handle(CalculationRequiredEvent event) {
		var calcDate = cutoffDateManager.getLastCutoff();
		var debitTotal = entryRepo.searchTotal(calcDate, event.accountId(), Type.Debit);
		var creditTotal = entryRepo.searchTotal(calcDate, event.accountId(), Type.Credit);
		var lastBalance = creditTotal.orElse(0) - debitTotal.orElse(0);
		
		var recalData = entryRepo.searchForCalculate(calcDate, event.accountId());
		
		for(var entry : recalData) {
			entry.setLastBalance(lastBalance);
			var amount = entry.getItems().stream().mapToInt(a -> a.getUnitPrice() * a.getQuantity()).sum();
			lastBalance = entry.getLedger().getType() == Type.Credit ? lastBalance + amount : lastBalance - amount;
		}
	}
}
