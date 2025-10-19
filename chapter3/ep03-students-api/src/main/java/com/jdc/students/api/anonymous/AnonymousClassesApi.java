package com.jdc.students.api.anonymous;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.students.api.anonymous.output.ClassDetails;
import com.jdc.students.api.anonymous.output.ClassListItem;

@RestController
@RequestMapping("anonymous/classes")
public class AnonymousClassesApi {

	@GetMapping
	List<ClassListItem> getAll() {
		return null;
	}
	
	@GetMapping("{id}")
	ClassDetails findById(@PathVariable int id) {
		return null;
	}
}
