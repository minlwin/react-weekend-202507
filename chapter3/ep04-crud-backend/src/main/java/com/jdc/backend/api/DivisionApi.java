package com.jdc.backend.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.backend.api.output.DivisionListItem;
import com.jdc.backend.model.service.DivisionService;

@RestController
@RequestMapping("divisions")
public class DivisionApi {
	
	@Autowired
	private DivisionService service;

	@GetMapping
	List<DivisionListItem> getAll() {
		return service.getAll();
	}
}
