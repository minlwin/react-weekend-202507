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

import com.jdc.students.api.anonymous.output.CourseDetails;
import com.jdc.students.api.anonymous.output.CourseListItem;
import com.jdc.students.api.staff.input.CourseForm;
import com.jdc.students.api.staff.input.CourseSearch;
import com.jdc.students.model.dto.ModificationResult;
import com.jdc.students.service.CourseService;

@RestController
@RequestMapping("staff/courses")
public class StaffCourseEndpoints {
	
	@Autowired
	private CourseService service;

	@GetMapping
	List<CourseListItem> search(CourseSearch search) {
		return service.search(search);
	}
	
	@GetMapping("{id}")
	CourseDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
	
	@PostMapping
	ModificationResult<Integer> create(
			@Validated @RequestBody CourseForm form) {
		return service.create(form);
	}
	
	@PutMapping("{id}")
	ModificationResult<Integer> update(@PathVariable int id, 
			@Validated @RequestBody CourseForm form) {
		return service.update(id, form);
	}
	
	@DeleteMapping("{id}")
	ModificationResult<Integer> delete(@PathVariable int id) {
		return service.delete(id);
	}
	
}
