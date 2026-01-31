package com.jdc.balance.model.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.balance.api.member.output.BalanceData;
import com.jdc.balance.api.member.output.SummaryData;
import com.jdc.balance.model.repo.LedgerEntryRepo;

@Service
@Transactional(readOnly = true)
public class MemberDashboardService {
	
	@Autowired
	private LoginUserService userService;
	@Autowired
	private LedgerEntryRepo entryRepo;
	@Autowired
	private MemberSummaryService summaryService;
	@Autowired
	private MemberBalanceService balanceService;

	public List<Integer> getYears() {
		
		var loginUser = userService.getLoginUser();
		var list = new ArrayList<Integer>();
		var firstEntry = entryRepo.getFirstIssueDate(loginUser.getId());
		
		if(firstEntry.isPresent()) {
			var startYear = firstEntry.map(a -> a.getYear()).orElseThrow();
			var endYear = entryRepo.getLastIssueDate(loginUser.getId())
					.map(a -> a.getYear()).orElseThrow();
			
			while(startYear <= endYear) {
				list.add(startYear);
				++ startYear;
			}
		}
		
		return list;
	}

	public List<BalanceData> getBalanceData(int year, Integer month) {
		var loginUser = userService.getLoginUser();
		return balanceService.getSummary(loginUser.getId(), year, month);
	}

	public SummaryData getSummaryData(int year, Integer month) {
		var loginUser = userService.getLoginUser();
		return summaryService.getSummary(loginUser.getId(), year, month);
	}

}
