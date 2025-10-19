package com.jdc.students.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jdc.students.api.anonymous.output.ClassDetails;
import com.jdc.students.api.anonymous.output.ClassListItem;
import com.jdc.students.api.staff.input.ClassesForm;
import com.jdc.students.api.staff.input.ClassesSearch;
import com.jdc.students.model.dto.ModificationResult;

@Service
public class ClassesService {

	public List<ClassListItem> getAvailableClasses() {
		// TODO Auto-generated method stub
		return null;
	}

	public ClassDetails findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<ClassListItem> search(ClassesSearch search) {
		// TODO Auto-generated method stub
		return null;
	}

	public ModificationResult<Integer> create(ClassesForm form) {
		// TODO Auto-generated method stub
		return null;
	}

	public ModificationResult<Integer> update(int id, ClassesForm form) {
		// TODO Auto-generated method stub
		return null;
	}

	public ModificationResult<Integer> delete(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}
