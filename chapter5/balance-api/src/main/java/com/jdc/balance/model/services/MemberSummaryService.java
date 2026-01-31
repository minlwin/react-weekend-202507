package com.jdc.balance.model.services;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.balance.api.member.output.SummaryData;
import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.LedgerEntry;
import com.jdc.balance.model.entity.LedgerEntryItem_;
import com.jdc.balance.model.entity.LedgerEntry_;
import com.jdc.balance.model.entity.Ledger_;
import com.jdc.balance.model.entity.pk.LedgerEntryPk_;
import com.jdc.balance.model.repo.LedgerEntryRepo;
import com.jdc.balance.utils.DateTimesUtils;
import com.jdc.balance.utils.dto.BalanceSummary;

@Service
@Transactional(readOnly = true)
public class MemberSummaryService {
	
	@Autowired
	private LedgerEntryRepo repo;

	public SummaryData getSummary(int userId, int year, Integer month) {
		
		if(null == month) {
			return getYearlySummary(userId, year);
		}
		
		return getMonthlySummary(userId, year, month);
	}

	private SummaryData getMonthlySummary(int userId, int year, int month) {
		var yearMonth = YearMonth.of(year, month);
		var startDate = yearMonth.atDay(1);
		var endDate = yearMonth.atEndOfMonth();
		
		var entries = getEntries(userId, startDate, endDate);
		
		var builder = SummaryData.builder();
		var debitEntries = groupByType(Type.Debit, entries);
		
		for(var key : debitEntries.keySet()) {
			builder.addDebit(key, debitEntries.get(key));
		}
		
		var creditEntries = groupByType(Type.Credit, entries);
		for(var key : creditEntries.keySet()) {
			builder.addCredit(key, creditEntries.get(key));
		}
		
		var seriesData = entries.stream()
				.collect(Collectors.groupingBy(
						BalanceSummary::issueAt, 
						Collectors.groupingBy(
								BalanceSummary::type, 
								Collectors.summingInt(BalanceSummary::value))
				));
		
		while(startDate.compareTo(endDate) <= 0) {
			var series = Optional.ofNullable(seriesData.get(startDate));
			var label = startDate.format(DateTimesUtils.CHART_DF);
			
			builder.addSeries(label, 
					series.map(a -> a.get(Type.Debit)).orElse(0), 
					series.map(a -> a.get(Type.Credit)).orElse(0));
			
			startDate = startDate.plusDays(1);
		}
		
		return builder.build();		
	}

	private SummaryData getYearlySummary(int userId, int year) {

		var startDate = LocalDate.of(year, 1, 1);
		var endDate = YearMonth.of(year, 12).atEndOfMonth();
		var entries = getEntries(userId, startDate, endDate);
		
		var builder = SummaryData.builder();
		var debitEntries = groupByType(Type.Debit, entries);
		
		for(var key : debitEntries.keySet()) {
			builder.addDebit(key, debitEntries.get(key));
		}
		
		var creditEntries = groupByType(Type.Credit, entries);
		for(var key : creditEntries.keySet()) {
			builder.addCredit(key, creditEntries.get(key));
		}
		
		var seriesData = entries.stream()
				.collect(Collectors.groupingBy(
						a -> YearMonth.of(a.issueAt().getYear(), a.issueAt().getMonth()), 
						Collectors.groupingBy(
								BalanceSummary::type, 
								Collectors.summingInt(BalanceSummary::value))
				));
		
		var startMonth = YearMonth.of(year, 1);
		
		while(startMonth.compareTo(YearMonth.of(year, 12)) <= 0) {
			var series = Optional.ofNullable(seriesData.get(startMonth));
			var label = startMonth.getMonth().getDisplayName(TextStyle.FULL, Locale.getDefault());
			
			builder.addSeries(label, 
					series.map(a -> a.get(Type.Debit)).orElse(0), 
					series.map(a -> a.get(Type.Credit)).orElse(0));
			
			startMonth = startMonth.plusMonths(1);
		}
		
		return builder.build();
	}
	

	private Map<String, Integer> groupByType(Type type, List<BalanceSummary> entries) {
		return entries.stream().filter(a -> a.type() == type)
				.collect(Collectors.groupingBy(
						BalanceSummary::ledger, 
						Collectors.summingInt(BalanceSummary::value)));
	}

	private List<BalanceSummary> getEntries(int userId, LocalDate startDate, LocalDate endDate) {
		
		return repo.search(cb -> {
			var cq = cb.createQuery(BalanceSummary.class);
			var root = cq.from(LedgerEntry.class);
			var details = root.join(LedgerEntry_.items);
			
			cq.select(cb.construct(BalanceSummary.class, 
					root.get(LedgerEntry_.id).get(LedgerEntryPk_.issueAt),
					root.get(LedgerEntry_.ledger).get(Ledger_.type),
					root.get(LedgerEntry_.ledger).get(Ledger_.name),
					cb.sum(cb.prod(details.get(LedgerEntryItem_.quantity), details.get(LedgerEntryItem_.unitPrice)))
			));
			
			cq.where(
				cb.equal(root.get(LedgerEntry_.id).get(LedgerEntryPk_.accountId), userId),
				cb.greaterThanOrEqualTo(root.get(LedgerEntry_.id).get(LedgerEntryPk_.issueAt), startDate),
				cb.lessThanOrEqualTo(root.get(LedgerEntry_.id).get(LedgerEntryPk_.issueAt), endDate)
			);
			
			cq.groupBy(
				root.get(LedgerEntry_.id).get(LedgerEntryPk_.issueAt),
				root.get(LedgerEntry_.ledger).get(Ledger_.type),
				root.get(LedgerEntry_.ledger).get(Ledger_.name)					
			);
			
			cq.orderBy(
				cb.asc(root.get(LedgerEntry_.id).get(LedgerEntryPk_.issueAt)),
				cb.asc(root.get(LedgerEntry_.ledger).get(Ledger_.type)),
				cb.asc(root.get(LedgerEntry_.ledger).get(Ledger_.name))
			);
			
			return cq;
		});
	}

	
}
