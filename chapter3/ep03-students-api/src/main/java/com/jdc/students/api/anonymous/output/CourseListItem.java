package com.jdc.students.api.anonymous.output;

import com.jdc.students.model.entity.Course;
import com.jdc.students.model.entity.Course_;
import com.jdc.students.model.entity.Course.Level;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record CourseListItem(
	int id,
	String name,
	Level level,
	int months,
	String description,
	String icon,
	boolean deleted) {

	public static void select(CriteriaQuery<CourseListItem> cq, Root<Course> root) {
		cq.multiselect(
			root.get(Course_.id),
			root.get(Course_.name),
			root.get(Course_.level),
			root.get(Course_.months),
			root.get(Course_.description),
			root.get(Course_.icon),
			root.get(Course_.deleted)
		);
	}

}
