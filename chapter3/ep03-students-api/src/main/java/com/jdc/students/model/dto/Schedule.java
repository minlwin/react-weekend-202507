package com.jdc.students.model.dto;

import java.time.DayOfWeek;
import java.time.LocalTime;

import jakarta.validation.constraints.NotNull;

public record Schedule(
		@NotNull(message = "Please select day.")
		DayOfWeek day, 
		@NotNull(message = "Please enter start time.")
		LocalTime startTime, 
		@NotNull(message = "Please enter end time.")
		LocalTime endTime) {

}
