package com.jdc.students.service;

import static com.jdc.students.utils.EntityOperationUtils.safeCall;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.students.api.anonymous.output.CourseDetails;
import com.jdc.students.api.anonymous.output.CourseListItem;
import com.jdc.students.api.staff.input.CourseForm;
import com.jdc.students.api.staff.input.CourseSearch;
import com.jdc.students.model.dto.ModificationResult;
import com.jdc.students.model.entity.Course;
import com.jdc.students.model.repo.CourseRepo;
import com.jdc.students.utils.StudentBusinessException;

@Service
@Transactional(readOnly = true)
public class CourseService {

	@Autowired
	private CourseRepo courseRepo;

	public List<CourseListItem> getAllValidCourses() {
		return search(CourseSearch.builder()
				.deleted(false).build());
	}

	public List<CourseListItem> search(CourseSearch search) {
		return courseRepo.search(cb -> {
			var cq = cb.createQuery(CourseListItem.class);
			
			// From
			var root = cq.from(Course.class);
			
			// Select
			CourseListItem.select(cq, root);
			
			// Where
			cq.where(search.where(cb, root));
			
			return cq;
		});
	}

	public CourseDetails findById(int id) {
		return safeCall(courseRepo.findById(id).map(CourseDetails::from), 
				"course", "id", id);
	}

	@Transactional
	public ModificationResult<Integer> create(CourseForm form) {
		
		if(courseRepo.findOneByName(form.name()).isPresent()) {
			throw new StudentBusinessException("%s is alread created.".formatted(form.name()));
		}
		
		var entity = courseRepo.save(form.entity());
		return new ModificationResult<>(entity.getId());
	}

	@Transactional
	public ModificationResult<Integer> update(int id, CourseForm form) {
		var entity = safeCall(courseRepo.findById(id), "course", "id", id);
		
		if(!entity.getName().equals(form.name()) && 
				courseRepo.findOneByName(form.name()).isPresent()) {
			throw new StudentBusinessException("%s is alread created.".formatted(form.name()));
		}

		entity.setName(form.name());
		entity.setIcon(form.icon());
		entity.setLevel(form.level());
		entity.setMonths(form.months());
		entity.setDescription(form.description());
		entity.setTopics(form.topics());
		
		return new ModificationResult<>(id);
	}

	@Transactional
	public ModificationResult<Integer> delete(int id) {
		
		var entity = safeCall(courseRepo.findById(id), "course", "id", id);
		entity.setDeleted(true);
		return new ModificationResult<>(id);
	}
}
