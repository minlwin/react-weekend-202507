package com.jdc.students.model.dto;

import jakarta.validation.constraints.NotBlank;

public record CourseTopic(
		@NotBlank(message = "Please enter topic title.")
		String title,
		@NotBlank(message = "Please enter topic description.")
		String description) {

}
