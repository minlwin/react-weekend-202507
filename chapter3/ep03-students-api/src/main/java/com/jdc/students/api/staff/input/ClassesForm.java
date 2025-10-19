package com.jdc.students.api.staff.input;

import java.time.LocalDate;
import java.util.List;

import com.jdc.students.model.dto.ClassType;
import com.jdc.students.model.dto.Schedule;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ClassesForm(
	@NotNull(message = "Please select course.")
	Integer courseId,
	@NotNull(message = "Please select class type.")
	ClassType type,
	@NotNull(message = "Please select start date.")
	LocalDate startDate,
	@NotNull(message = "Please enter duration in months.")
	Integer months,
	@NotNull(message = "Please enter monthly fees.")
	Integer monthlyFees,
	int registrationFees,
	@NotEmpty(message = "Plase enter schedules.")
	List<@Valid Schedule> schedules) {

}
