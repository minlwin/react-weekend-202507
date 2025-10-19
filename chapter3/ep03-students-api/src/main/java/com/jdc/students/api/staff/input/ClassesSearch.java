package com.jdc.students.api.staff.input;

import java.time.LocalDate;

import com.jdc.students.model.dto.ClassType;
import com.jdc.students.model.entity.Course.Level;

public record ClassesSearch(
		Level level,
		ClassType type,
		Boolean deleted,
		LocalDate startFrom,
		LocalDate startTo,
		String keyword) {

}
