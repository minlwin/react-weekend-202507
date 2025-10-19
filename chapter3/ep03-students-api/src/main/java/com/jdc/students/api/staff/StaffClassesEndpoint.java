package com.jdc.students.api.staff;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.students.api.anonymous.output.ClassDetails;
import com.jdc.students.api.anonymous.output.ClassListItem;
import com.jdc.students.api.staff.input.ClassesForm;
import com.jdc.students.api.staff.input.ClassesSearch;
import com.jdc.students.model.dto.ModificationResult;
import com.jdc.students.service.ClassesService;

@RestController
@RequestMapping("staff/classes")
public class StaffClassesEndpoint {
	
	@Autowired
	private ClassesService service;

	@GetMapping
	List<ClassListItem> search(ClassesSearch search) {
		return service.search(search);
	}
	
	@GetMapping("{id}")
	ClassDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
	
	@PostMapping
	ModificationResult<Integer> create(
			@Validated @RequestBody ClassesForm form) {
		return service.create(form);
	}
	
	@PutMapping("{id}")
	ModificationResult<Integer> update(@PathVariable int id, 
			@Validated @RequestBody ClassesForm form) {
		return service.update(id, form);
	}
	
	@DeleteMapping("{id}")
	ModificationResult<Integer> delete(@PathVariable int id) {
		return service.delete(id);
	}
	
}
