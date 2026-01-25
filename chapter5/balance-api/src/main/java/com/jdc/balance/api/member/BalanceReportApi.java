package com.jdc.balance.api.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.balance.api.member.input.BalanceSearch;
import com.jdc.balance.api.member.output.BalanceDetails;
import com.jdc.balance.api.member.output.BalanceListItem;
import com.jdc.balance.model.PageResult;
import com.jdc.balance.model.services.LedgerEntryService;

@RestController
@RequestMapping("member/balance")
public class BalanceReportApi {
	
	@Autowired
	private LedgerEntryService service;

	@GetMapping
	PageResult<BalanceListItem> search(BalanceSearch search, 
			@RequestParam(required = false, defaultValue = "0") int page,
			@RequestParam(required = false, defaultValue = "10") int size, 
			Authentication authentication) {
		return service.search(authentication.getName(), search, page, size);
	}
	
	@GetMapping("export")
	ResponseEntity<byte[]> export(BalanceSearch search, Authentication authentication) {
		return null;
	}

	@GetMapping("{id}")
	BalanceDetails findById(@PathVariable String id, Authentication authentication) {
		return service.findById(authentication.getName(), id);
	}
}
