package com.jdc.students.model;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record Schedule(
		DayOfWeek day, 
		LocalTime startTime, 
		LocalTime endTime) {

}
