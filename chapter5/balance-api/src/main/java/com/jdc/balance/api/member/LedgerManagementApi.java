package com.jdc.balance.api.member;

import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.balance.api.member.input.LedgerForm;
import com.jdc.balance.api.member.input.LedgerSearch;
import com.jdc.balance.api.member.input.LedgerUpdateForm;
import com.jdc.balance.api.member.output.LedgerDetails;
import com.jdc.balance.api.member.output.LedgerListItem;
import com.jdc.balance.model.DataModificationResult;
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
	
	@GetMapping("{code}")
	LedgerDetails findById(@PathVariable String code) {
		return service.findById(code);
	}
	
	@PostMapping
	DataModificationResult<String> create(
			@Validated @RequestBody LedgerForm form) {
		return service.create(form);
	}
	
	@PutMapping("{code}")
	DataModificationResult<String> update(
			@PathVariable String code, 
			@Validated @RequestBody LedgerUpdateForm form) {
		return service.update(code, form);
	}
}
