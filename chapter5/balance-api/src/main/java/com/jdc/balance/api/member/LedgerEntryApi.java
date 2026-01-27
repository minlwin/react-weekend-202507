package com.jdc.balance.api.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import com.jdc.balance.api.member.input.EntryForm;
import com.jdc.balance.api.member.input.EntrySearch;
import com.jdc.balance.api.member.output.EntryListItem;
import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.pk.LedgerEntryPk;
import com.jdc.balance.model.services.LedgerEntryService;
import com.jdc.balance.utils.ResponseUtils;
import com.jdc.balance.utils.dto.DataModificationResult;
import com.jdc.balance.utils.dto.PageResult;

@RestController
@RequestMapping("member/entries")
public class LedgerEntryApi {
	
	@Autowired
	private LedgerEntryService service;

	@GetMapping("{type}")
	PageResult<EntryListItem> search(
			@PathVariable Type type,
			EntrySearch search, 
			@RequestParam(required = false, defaultValue = "0") int page,
			@RequestParam(required = false, defaultValue = "10") int size, 
			Authentication authentication) {
		return service.search(authentication.getName(), type, search, page, size);
	}
	
	@GetMapping("{type}/export")
	ResponseEntity<byte[]> export(
			@PathVariable Type type, EntrySearch search, Authentication authentication) {
		var exportData = service.export(authentication.getName(), type, search);
		return ResponseUtils.ok(exportData);
	}

	@PostMapping
	DataModificationResult<LedgerEntryPk> create(@Validated @RequestBody EntryForm form, Authentication authentication) {
		return service.create(authentication.getName(), form);
	}
	
	@PutMapping("{id}")
	DataModificationResult<LedgerEntryPk> update(@PathVariable String id, @Validated @RequestBody EntryForm form, Authentication authentication) {
		return service.update(authentication.getName(), id, form);
	}
}