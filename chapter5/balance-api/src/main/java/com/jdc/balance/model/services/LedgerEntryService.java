package com.jdc.balance.model.services;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.balance.api.member.input.BalanceSearch;
import com.jdc.balance.api.member.input.EntryForm;
import com.jdc.balance.api.member.input.EntrySearch;
import com.jdc.balance.api.member.output.BalanceDetails;
import com.jdc.balance.api.member.output.BalanceListItem;
import com.jdc.balance.api.member.output.EntryListItem;
import com.jdc.balance.model.entity.Ledger.Type;
import com.jdc.balance.model.entity.LedgerEntry;
import com.jdc.balance.model.entity.LedgerEntryItem_;
import com.jdc.balance.model.entity.LedgerEntry_;
import com.jdc.balance.model.entity.Ledger_;
import com.jdc.balance.model.entity.pk.LedgerEntryPk;
import com.jdc.balance.model.entity.pk.LedgerEntryPk_;
import com.jdc.balance.model.entity.pk.LedgerPk;
import com.jdc.balance.model.entity.pk.LedgerPk_;
import com.jdc.balance.model.repo.LedgerEntryRepo;
import com.jdc.balance.model.repo.LedgerRepo;
import com.jdc.balance.utils.Nullsafe;
import com.jdc.balance.utils.dto.DataModificationResult;
import com.jdc.balance.utils.dto.PageResult;
import com.jdc.balance.utils.exceptions.BusinessException;
import com.jdc.balance.utils.export.BalanceReportExporter;
import com.jdc.balance.utils.export.LedgerEntryExporter;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;

@Service
@Transactional(readOnly = true)
public class LedgerEntryService {
	
	@Autowired
	private LoginUserService loginUserService;
	@Autowired
	private EntrySeqGenerator idGenerator;
	@Autowired
	private LedgerRepo ledgerRepo;
	@Autowired
	private LedgerEntryRepo entryRepo;
	
	@Value("${app.entry.cut-off-date}")
	private int cutOffDate;


	@Transactional
	@PreAuthorize("authentication.name eq #ownerName")
	public DataModificationResult<LedgerEntryPk> create(String ownerName, EntryForm form) {
		
		validate(form);
		
		var loginUser = loginUserService.getLoginUser();
		var ledger = Nullsafe.call(ledgerRepo.findById(LedgerPk.from(loginUser.getId(), form.code())), "Ledger", form.code());
		var id = idGenerator.next(form.issueAt(), loginUser.getId());
		
		var entity = new LedgerEntry();
		entity.setId(id);
		entity.setLedger(ledger);
		entity.setParticular(form.particular());
		
		for(var i = 0; i < form.items().size(); i ++) {
			entity.addItem(form.items().get(i), i + 1);
		}
		
		entity = entryRepo.save(entity);
		
		calculate(entity.getId().issueAt(), entity.getId().entrySeq());
		
		return new DataModificationResult<>(entity.getId());
	}

	@Transactional
	@PreAuthorize("authentication.name eq #ownerName")
	public DataModificationResult<LedgerEntryPk> update(String ownerName, String code, EntryForm form) {
		
		validate(form);
		
		var loginUser = loginUserService.getLoginUser();
		var id = LedgerEntryPk.from(loginUser.getId(), code);
		
		if(isExeedCutOff(id.issueAt())) {
			throw new BusinessException("You can't cahnge fixed entry.");
		}
		
		entryRepo.deleteById(id);
		calculate(id.issueAt(), id.entrySeq());
		
		return create(ownerName, form);
	}

	@PreAuthorize("authentication.name eq #ownerName")
	public BalanceDetails findById(String ownerName, String code) {
		var loginUser = loginUserService.getLoginUser();
		var id = LedgerEntryPk.from(loginUser.getId(), code);
		return Nullsafe.call(entryRepo.findById(id).map(BalanceDetails::from), "Ledger Entry", code);
	}

	@PreAuthorize("authentication.name eq #ownerName")
	public PageResult<BalanceListItem> search(String ownerName, BalanceSearch search, int page, int size) {
		return entryRepo.search(searchQuery(ownerName, search), countQuery(ownerName, search), page, size);
	}

	@PreAuthorize("authentication.name eq #ownerName")
	public PageResult<EntryListItem> search(String ownerName, Type type, EntrySearch search, int page, int size) {
		return entryRepo.search(searchQuery(ownerName, type, search), countQuery(ownerName, type, search), page, size);
	}

	@PreAuthorize("authentication.name eq #ownerName")
	public byte[] export(String ownerName, BalanceSearch search) {
		var list = entryRepo.search(searchQuery(ownerName, search));
		
		if(list.isEmpty()) {
			throw new BusinessException("There is no data to export.");
		}
		
		return BalanceReportExporter.export(list);
	}

	@PreAuthorize("authentication.name eq #ownerName")
	public byte[] export(String ownerName, Type type, EntrySearch search) {

		var list = entryRepo.search(searchQuery(ownerName, type, search));
		
		if(list.isEmpty()) {
			throw new BusinessException("There is no data to export.");
		}
		
		return LedgerEntryExporter.export(list);
	}

	private void validate(EntryForm form) {
		if(isExeedCutOff(form.issueAt())) {
			throw new BusinessException("Issue date is over cutoff date.");
		}
	}
	
	private boolean isExeedCutOff(LocalDate date) {
		var cutOff = YearMonth.now().atDay(cutOffDate);
		return cutOff.compareTo(date) >= 0;
	}

	private void calculate(LocalDate issueAt, int entrySeq) {
		var recalDate = entrySeq > 1 ? issueAt : issueAt.minusDays(1);
		var loginUser = loginUserService.getLoginUser();
		
		var debitTotal = entryRepo.searchTotal(recalDate, loginUser.getId(), Type.Debit);
		var creditTotal = entryRepo.searchTotal(recalDate, loginUser.getId(), Type.Credit);
		var lastBalance = creditTotal.orElse(0) - debitTotal.orElse(0);
		
		var recalData = entryRepo.searchForCalculate(recalDate, loginUser.getId());
		
		for(var entry : recalData) {
			entry.setLastBalance(lastBalance);
			var amount = entry.getItems().stream().mapToInt(a -> a.getUnitPrice() * a.getQuantity()).sum();
			lastBalance = entry.getLedger().getType() == Type.Credit ? lastBalance + amount : lastBalance - amount;
		}
		
	}
	
	private Function<CriteriaBuilder, CriteriaQuery<BalanceListItem>> searchQuery(String ownerName, BalanceSearch search) {
		return cb -> {
			var cq = cb.createQuery(BalanceListItem.class);
			var root = cq.from(LedgerEntry.class);
			
			var items = root.join(LedgerEntry_.items);
			
			cq.where(search.where(cb, root, ownerName));
			cq.select(cb.construct(
				BalanceListItem.class, 
				root.get(LedgerEntry_.id),
				root.get(LedgerEntry_.ledger).get(Ledger_.type),
				root.get(LedgerEntry_.ledger).get(Ledger_.id).get(LedgerPk_.code),
				root.get(LedgerEntry_.ledger).get(Ledger_.name),
				root.get(LedgerEntry_.particular),
				root.get(LedgerEntry_.lastBalance),
				cb.sum(cb.prod(items.get(LedgerEntryItem_.quantity), items.get(LedgerEntryItem_.unitPrice)))
			));
			
			cq.groupBy(
				root.get(LedgerEntry_.id),
				root.get(LedgerEntry_.ledger).get(Ledger_.type),
				root.get(LedgerEntry_.ledger).get(Ledger_.id).get(LedgerPk_.code),
				root.get(LedgerEntry_.ledger).get(Ledger_.name),
				root.get(LedgerEntry_.particular),
				root.get(LedgerEntry_.lastBalance)
			);
			
			cq.orderBy(
				cb.asc(root.get(LedgerEntry_.id).get(LedgerEntryPk_.issueAt)),
				cb.asc(root.get(LedgerEntry_.id).get(LedgerEntryPk_.entrySeq))
			);
			
			return cq;
		};
	}

	private Function<CriteriaBuilder, CriteriaQuery<Long>> countQuery(String ownerName, BalanceSearch search) {
		return cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(LedgerEntry.class);
			
			cq.where(search.where(cb, root, ownerName));
			cq.select(cb.count(root.get(LedgerEntry_.id)));
			
			return cq;
		};
	}

	private Function<CriteriaBuilder, CriteriaQuery<EntryListItem>> searchQuery(String ownerName, Type type, EntrySearch search) {
		return cb -> {
			var cq = cb.createQuery(EntryListItem.class);
			var root = cq.from(LedgerEntry.class);
			
			var items = root.join(LedgerEntry_.items);
			
			cq.where(search.where(cb, root, ownerName, type));
			cq.select(cb.construct(
				EntryListItem.class, 
				root.get(LedgerEntry_.id),
				root.get(LedgerEntry_.ledger).get(Ledger_.type),
				root.get(LedgerEntry_.ledger).get(Ledger_.id).get(LedgerPk_.code),
				root.get(LedgerEntry_.ledger).get(Ledger_.name),
				root.get(LedgerEntry_.particular),
				cb.sum(cb.prod(items.get(LedgerEntryItem_.quantity), items.get(LedgerEntryItem_.unitPrice)))
			));
			
			cq.groupBy(
				root.get(LedgerEntry_.id),
				root.get(LedgerEntry_.ledger).get(Ledger_.type),
				root.get(LedgerEntry_.ledger).get(Ledger_.id).get(LedgerPk_.code),
				root.get(LedgerEntry_.ledger).get(Ledger_.name),
				root.get(LedgerEntry_.particular)
			);
			
			cq.orderBy(
				cb.asc(root.get(LedgerEntry_.id).get(LedgerEntryPk_.issueAt)),
				cb.asc(root.get(LedgerEntry_.id).get(LedgerEntryPk_.entrySeq))
			);
			
			return cq;
		};
	}

	private Function<CriteriaBuilder, CriteriaQuery<Long>> countQuery(String ownerName, Type type, EntrySearch search) {
		return cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(LedgerEntry.class);
			
			cq.where(search.where(cb, root, ownerName, type));
			cq.select(cb.count(root.get(LedgerEntry_.id)));
			
			return cq;
		};
	}
}
