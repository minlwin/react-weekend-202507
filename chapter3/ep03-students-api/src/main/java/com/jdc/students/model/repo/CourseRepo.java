package com.jdc.students.model.repo;

import java.util.Optional;

import com.jdc.students.model.BaseRepository;
import com.jdc.students.model.entity.Course;

public interface CourseRepo extends BaseRepository<Course, Integer>{

	Optional<Course> findOneByName(String name);
}
