package com.jdc.students.anonymous.output;

import java.time.LocalDate;
import java.util.List;

import com.jdc.students.model.ClassType;
import com.jdc.students.model.Schedule;

public record ClassListItem(
		int id,
		CourseListItem course,
		ClassType type,
		LocalDate startAt,
		int months,
		int monthlyFees,
		List<Schedule> schedules
		) {

}
