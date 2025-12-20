package com.jdc.balance.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class LedgerEntryItem {

	@EmbeddedId
	private LedgerEntryItemPk id;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "entry_id", referencedColumnName = "id", insertable = false, updatable = false)
	private LedgerEntry entry;
	
	@Column(nullable = false)
	private String item;
	
	@Column(nullable = false)
	private int unitPrice;

	@Column(nullable = false)
	private int quantity;
	
	private String remark;
}
