package com.jdc.students.model.entity;

import java.io.Serializable;
import java.util.List;

import com.jdc.students.model.converter.CourseTopicsConverter;
import com.jdc.students.model.dto.CourseTopic;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Course implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false, unique = true)
	private String name;
	
	@Column(nullable = false)
	private String icon;

	@Column(nullable = false)
	private Level level;
	
	@Column(nullable = false)
	private int months;
	
	private String description;

	@Convert(converter = CourseTopicsConverter.class)
	@Column(nullable = false, columnDefinition = "TEXT")
	private List<CourseTopic> topics;
	
	private boolean deleted;
	
	public enum Level {
		Basic, Intermediate, Advance, AllInOne {
			@Override
			public String getDisplayName() {
				return "All in One";
			}
		};
		
		public String getDisplayName() {
			return name();
		}
	}
}
