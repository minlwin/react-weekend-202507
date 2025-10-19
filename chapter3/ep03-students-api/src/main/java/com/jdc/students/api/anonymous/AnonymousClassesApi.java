package com.jdc.students.api.anonymous;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.students.api.anonymous.output.ClassDetails;
import com.jdc.students.api.anonymous.output.ClassListItem;
import com.jdc.students.service.ClassesService;

@RestController
@RequestMapping("anonymous/classes")
public class AnonymousClassesApi {
	
	@Autowired
	private ClassesService service;

	@GetMapping
	List<ClassListItem> getAll() {
		return service.getAvailableClasses();
	}
	
	@GetMapping("{id}")
	ClassDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
}
