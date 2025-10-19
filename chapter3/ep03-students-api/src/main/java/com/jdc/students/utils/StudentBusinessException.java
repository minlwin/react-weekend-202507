package com.jdc.students.utils;

public class StudentBusinessException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public StudentBusinessException(String message, Throwable cause) {
		super(message, cause);
	}

	public StudentBusinessException(String message) {
		super(message);
	}
	
}
