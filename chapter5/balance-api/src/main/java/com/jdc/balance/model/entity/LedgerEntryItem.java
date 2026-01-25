package com.jdc.balance.model.entity;

import com.jdc.balance.model.entity.pk.EntryItemPk;

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
	@JoinColumn(name = "entry_account_id", referencedColumnName = "account_id", insertable = false, updatable = false)
	@JoinColumn(name = "entry_issue_at", referencedColumnName = "issue_at", insertable = false, updatable = false)
	@JoinColumn(name = "entry_entry_seq", referencedColumnName = "entry_seq", insertable = false, updatable = false)
	private EntryItemPk id;
	
	@ManyToOne(optional = false)
	private LedgerEntry entry;
	
	@Column(nullable = false)
	private String item;
	
	@Column(nullable = false)
	private int unitPrice;

	@Column(nullable = false)
	private int quantity;
	
	private String remark;
}
