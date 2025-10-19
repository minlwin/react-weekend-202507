package com.jdc.students.api.staff.input;

import java.util.List;

import com.jdc.students.model.dto.CourseTopic;
import com.jdc.students.model.entity.Course;
import com.jdc.students.model.entity.Course.Level;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CourseForm(
		@NotBlank(message = "Please enter course name.")
		String name,
		@NotBlank(message = "Please select course icon.")
		String icon,
		@NotNull(message = "Please enter duration in months.")
		Integer months,
		@NotNull(message = "Please select course level.")
		Level level,
		String description,
		@NotEmpty(message = "Please select course topics.")
		List<@Valid CourseTopic> topics) {

	public Course entity() {
		
		var entity = new Course();
		
		entity.setName(name);
		entity.setIcon(icon);
		entity.setMonths(months);
		entity.setLevel(level);
		entity.setDescription(description);
		entity.setTopics(topics);
		
		return entity;
	}

}
