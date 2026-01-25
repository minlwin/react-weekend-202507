package com.jdc.balance.model.entity;

import java.util.ArrayList;
import java.util.List;

import com.jdc.balance.api.member.input.EntryFormItem;
import com.jdc.balance.model.AbstractEntity;
import com.jdc.balance.model.entity.pk.EntryItemPk;
import com.jdc.balance.model.entity.pk.LedgerEntryPk;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class LedgerEntry extends AbstractEntity{

	@EmbeddedId
	private LedgerEntryPk id;
	
	@ManyToOne(optional = false)
	private Ledger ledger;
	
	@Column(nullable = false)
	private String particular;
	
	private int lastBalance;
	
	@OneToMany(
		mappedBy = "entry", 
		orphanRemoval = true,
		cascade = {
			CascadeType.PERSIST, CascadeType.MERGE
		}
	)
	private List<LedgerEntryItem> items;

	public void addItem(EntryFormItem item, int seq) {
		
		if(items == null) {
			items = new ArrayList<>();
		}
		
		var entryItem = new LedgerEntryItem();
		entryItem.setId(EntryItemPk.from(id, seq));
		entryItem.setEntry(this);
		entryItem.setItem(item.item());
		entryItem.setQuantity(item.quantity());
		entryItem.setUnitPrice(item.unitPrice());
		entryItem.setRemark(item.remark());
		
		items.add(entryItem);
	}
}
