package com.jdc.students.api.anonymous.output;

import com.jdc.students.model.entity.Course.Level;

public record CourseListItem(
	int id,
	String name,
	Level level,
	int months,
	String description,
	String icon) {

}
