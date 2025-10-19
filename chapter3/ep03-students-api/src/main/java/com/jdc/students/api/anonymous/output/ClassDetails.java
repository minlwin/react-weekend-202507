package com.jdc.students.api.anonymous.output;

import java.time.LocalDate;
import java.util.List;

import com.jdc.students.model.ClassType;
import com.jdc.students.model.Schedule;

public record ClassDetails(
		int id,
		CourseDetails course,
		ClassType type,
		LocalDate startAt,
		int months,
		int monthlyFees,
		int registrationFees,
		List<Schedule> schedules, 
		long applied) {

}
