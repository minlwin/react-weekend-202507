package com.jdc.students.model.converter;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jdc.students.model.Schedule;

import jakarta.persistence.AttributeConverter;

@Component
public class SchedulesConverter implements AttributeConverter<List<Schedule>, String>{

	private ObjectMapper objectMapper;
	
	@Override
	public String convertToDatabaseColumn(List<Schedule> attribute) {

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
	public List<Schedule> convertToEntityAttribute(String dbData) {
		if(StringUtils.hasLength(dbData)) {
			try {
				return objectMapper.readValue(dbData, new TypeReference<List<Schedule>>() {});
			} catch (JsonProcessingException e) {
				throw new RuntimeException(e);
			}
		}

		return null;
	}

}
