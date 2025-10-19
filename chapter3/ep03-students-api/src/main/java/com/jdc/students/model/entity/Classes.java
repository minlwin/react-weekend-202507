package com.jdc.students.model.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.jdc.students.model.ClassType;
import com.jdc.students.model.Schedule;
import com.jdc.students.model.converter.SchedulesConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Data
@Entity
@SequenceGenerator(name = "classSeq", allocationSize = 1)
public class Classes implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(generator = "classSeq")
	private int id;
	
	@ManyToOne(optional = false)
	private Course course;
	
	@Column(nullable = false)
	private ClassType type;
	
	@Column(nullable = false)
	private LocalDate startAt;
	
	@Column(nullable = false)
	private int months;
	
	@Column(nullable = false)
	private int monthlyFees;
	
	private int registrationFees;

	@Convert(converter = SchedulesConverter.class)
	@Column(nullable = false, columnDefinition = "TEXT")
	private List<Schedule> schedules;
}
