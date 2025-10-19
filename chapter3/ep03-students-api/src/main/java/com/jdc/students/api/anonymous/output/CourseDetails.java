package com.jdc.students.api.anonymous.output;

import java.util.List;

import com.jdc.students.model.CourseTopic;
import com.jdc.students.model.entity.Course.Level;

public record CourseDetails(
		int id,
		String name,
		Level level,
		int months,
		String description,
		String icon,
		List<CourseTopic> topics) {

}
