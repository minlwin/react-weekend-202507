package com.jdc.students.api.anonymous.output;

import java.time.LocalDate;
import java.util.List;

import com.jdc.students.model.dto.ClassType;
import com.jdc.students.model.dto.Schedule;

public record ClassListItem(
		int id,
		CourseListItem course,
		ClassType type,
		LocalDate startAt,
		int months,
		int monthlyFees,
		boolean deleted,
		List<Schedule> schedules
		) {

}
