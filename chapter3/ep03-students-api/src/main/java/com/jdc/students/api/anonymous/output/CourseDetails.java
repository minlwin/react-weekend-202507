package com.jdc.students.api.anonymous.output;

import java.util.List;

import com.jdc.students.model.dto.CourseTopic;
import com.jdc.students.model.entity.Course;
import com.jdc.students.model.entity.Course.Level;

public record CourseDetails(
		int id,
		String name,
		Level level,
		int months,
		String description,
		String icon,
		boolean deleted,
		List<CourseTopic> topics) {
	
	public static CourseDetails from(Course entity) {
		return new CourseDetails(
				entity.getId(), 
				entity.getName(), 
				entity.getLevel(), 
				entity.getMonths(), 
				entity.getDescription(), 
				entity.getIcon(), 
				entity.isDeleted(), 
				entity.getTopics());
	}

}
