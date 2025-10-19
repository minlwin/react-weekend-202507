package com.jdc.students.api.staff.input;

import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.students.model.entity.Course;
import com.jdc.students.model.entity.Course_;
import com.jdc.students.model.entity.Course.Level;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record CourseSearch(
        Level level,
        Boolean deleted,
        Integer monthFrom,
        Integer monthTo,
        String keyword) {
	
	public Predicate[] where(CriteriaBuilder cb, Root<Course> root) {
		
		var params = new ArrayList<Predicate>();
		
		if(null != level) {
			params.add(cb.equal(root.get(Course_.level), level));
		}
		
		if(null != deleted) {
			params.add(cb.equal(root.get(Course_.deleted), deleted));
		}

		if(null != monthFrom) {
			params.add(cb.ge(root.get(Course_.months), monthFrom));
		}

		if(null != monthTo) {
			params.add(cb.le(root.get(Course_.months), monthTo));
		}
		
		if(StringUtils.hasLength(keyword)) {
			params.add(cb.or(
				cb.like(cb.lower(root.get(Course_.name)), "%s%%".formatted(keyword.toLowerCase())),
				cb.like(cb.lower(root.get(Course_.description)), "%%%s%%".formatted(keyword.toLowerCase()))
			));
		}

		return params.toArray(size -> new Predicate[size]);
	}

	
	public static Builder builder() {
		return new Builder();
	}

    public static class Builder {
        private Level level;
        private Boolean deleted;
        private Integer monthFrom;
        private Integer monthTo;
        private String keyword;

        public Builder level(Level level) {
            this.level = level;
            return this;
        }

        public Builder deleted(Boolean deleted) {
            this.deleted = deleted;
            return this;
        }

        public Builder monthFrom(Integer monthFrom) {
            this.monthFrom = monthFrom;
            return this;
        }

        public Builder monthTo(Integer monthTo) {
            this.monthTo = monthTo;
            return this;
        }

        public Builder keyword(String keyword) {
            this.keyword = keyword;
            return this;
        }

        public CourseSearch build() {
            return new CourseSearch(level, deleted, monthFrom, monthTo, keyword);
        }
    }

}

