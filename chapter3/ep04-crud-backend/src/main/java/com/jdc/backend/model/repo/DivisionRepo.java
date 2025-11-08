package com.jdc.backend.model.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.jdc.backend.api.output.DivisionListItem;
import com.jdc.backend.model.entity.Division;

public interface DivisionRepo extends JpaRepository<Division, Integer>{

	@Query("select new com.jdc.backend.api.output.DivisionListItem(d.id, d.name, d.capital, d.region) from Division d")
	List<DivisionListItem> searchAll();

}
