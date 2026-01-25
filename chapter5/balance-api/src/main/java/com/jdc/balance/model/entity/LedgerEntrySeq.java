package com.jdc.balance.model.entity;

import com.jdc.balance.model.entity.pk.EntrySeqPk;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class LedgerEntrySeq {

	@EmbeddedId
	private EntrySeqPk id;
	private int seqNumber;
}
