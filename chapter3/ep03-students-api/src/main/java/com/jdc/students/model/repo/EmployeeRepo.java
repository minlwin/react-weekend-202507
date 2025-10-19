package com.jdc.students.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jdc.students.model.entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Integer>{

}
