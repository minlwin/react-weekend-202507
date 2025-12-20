package com.jdc.balance.model.entity;

import java.time.LocalDate;
import java.util.List;

import com.jdc.balance.model.AbstractEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class LedgerEntry extends AbstractEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne(optional = false)
	private Ledger ledger;
	
	@Column(nullable = false)
	private LocalDate issueAt;

	@Column(nullable = false)
	private String particular;
	
	@OneToMany(mappedBy = "entry")
	private List<LedgerEntryItem> items;
	
}
