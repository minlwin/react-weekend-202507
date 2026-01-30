package com.jdc.balance.api.admin;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.balance.model.services.AdminSummaryService;
import com.jdc.balance.utils.dto.ChartData;
import com.jdc.balance.utils.dto.MonthData;

@RestController
@RequestMapping("admin/summary")
public class AdminSummaryApi {
	
	@Autowired
	private AdminSummaryService service;

	@GetMapping("years")
	List<Integer> getYears() {
		return service.getYears();
	}
	
	@GetMapping("months")
	List<MonthData> getMonths() {
		return Arrays.stream(Month.values())
				.map(a -> new MonthData(a.getValue(), a.getDisplayName(TextStyle.FULL, Locale.getDefault())))
				.toList();
	}
	
	@GetMapping("members/{year}")
	List<ChartData> getUserData(@PathVariable int year, @RequestParam(required = false) Integer month) {
		return service.searchUserSummary(year, month);
	}
}
