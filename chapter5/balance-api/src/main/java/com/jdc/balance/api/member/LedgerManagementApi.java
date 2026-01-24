package com.jdc.balance.api.member;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.balance.api.member.input.LedgerSearch;
import com.jdc.balance.api.member.output.LedgerListItem;
import com.jdc.balance.model.PageResult;
import com.jdc.balance.model.services.LedgerService;

@RestController
@RequestMapping("member/ledgers")
public class LedgerManagementApi {
	
	private LedgerService service;

	@GetMapping
	PageResult<LedgerListItem> search(LedgerSearch search,
			@RequestParam(required = false, defaultValue = "0") int page,
			@RequestParam(required = false, defaultValue = "10") int size, 
			Authentication authentication) {
		return service.search(authentication.getName(), search, page, size);
	}
}
