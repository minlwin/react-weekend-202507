package com.jdc.balance.model.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jdc.balance.model.BaseRepository;
import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.LedgerEntry;
import com.jdc.balance.model.entity.pk.LedgerEntryPk;

public interface LedgerEntryRepo extends BaseRepository<LedgerEntry, LedgerEntryPk>{

	@Query("""
			select lg from LedgerEntry lg 
			where lg.id.accountId = :accountId 
			and lg.id.issueAt >= :calcDate 
			order by lg.id.issueAt, lg.id.entrySeq
			""")
	List<LedgerEntry> searchForCalculate(
			@Param("calcDate") LocalDate calcDate, 
			@Param("accountId") int accountId);
	
	@Query("""
			select sum(lgd.unitPrice * lgd.quantity) from LedgerEntry lg 
			join lg.items lgd 
			where lg.id.accountId = :accountId 
			and lg.ledger.type = :type 
			and lg.id.issueAt < :calcDate
			""")
	Integer searchTotal(
			@Param("calcDate") LocalDate calcDate, 
			@Param("accountId") int accountId, 
			@Param("type") Type type);
}
