package com.jdc.balance.model.services;

import java.time.LocalDate;
import java.time.Month;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.balance.model.entity.Account;
import com.jdc.balance.model.entity.Account.Role;
import com.jdc.balance.model.entity.Account_;
import com.jdc.balance.model.repo.AccountRepo;
import com.jdc.balance.utils.DateTimesUtils;
import com.jdc.balance.utils.dto.ChartData;

@Service
@Transactional(readOnly = true)
public class AdminSummaryService {
	
	@Autowired
	private AccountRepo accountRepo;

	public List<Integer> getYears() {
		
		var list = new ArrayList<Integer>();
		var firstRigst = accountRepo.findFirstRegistration(Role.Member);
		
		if(firstRigst.isPresent()) {
			var startYear = firstRigst.map(a -> a.getYear()).orElseThrow();
			var endYear = accountRepo.findLastRegistration(Role.Member)
					.map(a -> a.getYear()).orElseThrow();
			
			while(startYear <= endYear) {
				list.add(startYear);
				++ startYear;
			}
		}
		
		return list;
	}

	public List<ChartData> searchUserSummary(int year, Integer month) {
		
		if(null == month) {
			return searchYearlySummary(year);
		}
		
		return searchMonthlySummary(year, month);
	}
	
	private List<ChartData> searchYearlySummary(int year) {
		var result = new ArrayList<ChartData>();
		
		for(var month : Month.values()) {
			var targetMonth = YearMonth.of(year, month);
			var count = findUsers(targetMonth.atDay(1), targetMonth.atEndOfMonth());
			result.add(new ChartData(targetMonth.getMonth().getDisplayName(TextStyle.FULL, Locale.getDefault()), count.intValue()));
		}
		
		return result;
	}
	
	private List<ChartData> searchMonthlySummary(int year, int month) {
		var result = new ArrayList<ChartData>();
		var yearMonth = YearMonth.of(year, month);
		var target = YearMonth.of(year, month).atDay(1);
		
		while(target.compareTo(yearMonth.atEndOfMonth()) <= 0) {
			var count = findUsers(target, target);
			result.add(new ChartData(target.format(DateTimesUtils.CHART_DF), count.intValue()));
			target = target.plusDays(1);
		}
		
		return result;
	}
	
	private Long findUsers(LocalDate from, LocalDate to) {

		return accountRepo.searchCount(cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Account.class);
			cq.select(cb.count(root.get(Account_.id)));
			cq.where(
				cb.equal(root.get(Account_.role), Role.Member),
				cb.greaterThanOrEqualTo(root.get(Account_.registeredAt), from.atStartOfDay()),
				cb.lessThan(root.get(Account_.registeredAt), to.plusDays(1).atStartOfDay())
			);
			return cq;
		});
	}

}
