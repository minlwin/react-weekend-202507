package com.jdc.balance.model.entity;

import java.util.ArrayList;
import java.util.List;

import com.jdc.balance.model.AbstractEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Ledger extends AbstractEntity{

	@Id
	private String code;
	
	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String description;
	
	@Column(nullable = false)
	private Type type;
	
	@ManyToOne(optional = false)
	private Account owner;
	
	@OneToMany(mappedBy = "ledger")
	private List<LedgerEntry> entries = new ArrayList<>();
	
	public enum Type {
		Debit, Credit
	}
}
