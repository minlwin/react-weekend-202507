package com.jdc.students.api.anonymous;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.students.api.anonymous.output.CourseDetails;
import com.jdc.students.api.anonymous.output.CourseListItem;

@RestController
@RequestMapping("anonymous/course")
public class AnonymousCoursesApi {

	@GetMapping
	List<CourseListItem> getAll() {
		return null;
	}
	
	@GetMapping("{id}")
	CourseDetails findById(int id) {
		return null;
	}
}
