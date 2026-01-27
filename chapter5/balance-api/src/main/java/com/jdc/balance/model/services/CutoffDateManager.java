package com.jdc.balance.model.services;

import java.time.LocalDate;
import java.time.YearMonth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CutoffDateManager {

	@Value("${app.entry.cut-off-date}")
	private int cutOffDate;
	
	
	public LocalDate getCuttoffDate() {
		var cutoff = YearMonth.now().atDay(cutOffDate);
		return LocalDate.now().compareTo(cutoff) >= 0 ? cutoff.plusMonths(1) : cutoff;
	}
	
	public LocalDate getLastCutoff() {
		return getCuttoffDate().minusMonths(1);
	}

}
