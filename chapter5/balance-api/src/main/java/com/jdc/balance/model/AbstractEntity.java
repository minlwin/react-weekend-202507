package com.jdc.balance.model;

import java.time.Instant;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(value = AuditingEntityListener.class)
public abstract class AbstractEntity {

	private boolean deleted;
	
	@CreatedBy
	private String createdBy;
	
	@CreatedDate
	private Instant createdAt;
	
	@LastModifiedBy
	private String updatedBy;
	
	@LastModifiedDate
	private Instant updatedAt;
}
