package com.jdc.students.api.anonymous;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.students.api.anonymous.output.CourseDetails;
import com.jdc.students.api.anonymous.output.CourseListItem;
import com.jdc.students.service.CourseService;

@RestController
@RequestMapping("anonymous/course")
public class AnonymousCoursesApi {
	
	@Autowired
	private CourseService service;

	@GetMapping
	List<CourseListItem> getAll() {
		return service.getAllValidCourses();
	}
	
	@GetMapping("{id}")
	CourseDetails findById(int id) {
		return service.findById(id);
	}
}
