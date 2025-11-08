package com.jdc.backend.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jdc.backend.api.output.DivisionListItem;
import com.jdc.backend.model.repo.DivisionRepo;

@Service
public class DivisionService {
	
	@Autowired
	private DivisionRepo repo;

	public List<DivisionListItem> getAll() {
		return repo.searchAll();
	}

}
