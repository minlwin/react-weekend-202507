package com.jdc.students.model.converter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jdc.students.model.dto.CourseTopic;

import jakarta.persistence.AttributeConverter;

@Component
public class CourseTopicsConverter implements AttributeConverter<List<CourseTopic>, String>{

	@Autowired
	private ObjectMapper objectMapper;
	
	@Override
	public String convertToDatabaseColumn(List<CourseTopic> attribute) {
		
		if(null != attribute) {
			try {
				return objectMapper.writeValueAsString(attribute);
			} catch (JsonProcessingException e) {
				throw new RuntimeException(e);
			}
		}
		
		return null;
	}

	@Override
	public List<CourseTopic> convertToEntityAttribute(String dbData) {
		
		if(StringUtils.hasLength(dbData)) {
			try {
				return objectMapper.readValue(dbData, new TypeReference<List<CourseTopic>>() {});
			} catch (JsonProcessingException e) {
				throw new RuntimeException(e);
			}
		}
		
		return null;
	}

}
