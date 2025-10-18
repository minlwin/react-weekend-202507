package com.jdc.students.anonymous.output;

import java.util.List;

import com.jdc.students.model.CourseTopic;

public record CourseDetails(
		int id,
		String name,
		String description,
		String icon,
		List<CourseTopic> topics) {

}
