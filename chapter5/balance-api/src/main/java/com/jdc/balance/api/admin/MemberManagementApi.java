package com.jdc.balance.api.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.balance.api.admin.input.MemberSearch;
import com.jdc.balance.api.admin.input.MemberStatusForm;
import com.jdc.balance.api.admin.output.MemberDetails;
import com.jdc.balance.api.admin.output.MemberListItem;
import com.jdc.balance.model.DataModificationResult;
import com.jdc.balance.model.PageResult;
import com.jdc.balance.model.services.AccountService;

@RestController
@RequestMapping("admin/members")
public class MemberManagementApi {
	
	@Autowired
	private AccountService service;

	@GetMapping
	PageResult<MemberListItem> search(
			MemberSearch search, 
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return service.search(search, page, size);
	}
	
	@GetMapping("{id}")
	MemberDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
	
	@PostMapping("{id}")
	DataModificationResult<Integer> update(
			@PathVariable int id,
			@Validated @RequestBody MemberStatusForm form) {
		return service.update(form);
	}
}
