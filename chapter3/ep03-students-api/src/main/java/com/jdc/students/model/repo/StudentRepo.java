package com.jdc.students.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jdc.students.model.entity.Student;

public interface StudentRepo extends JpaRepository<Student, Integer>{

}
