package com.jdc.balance.model.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.balance.api.member.output.BalanceData;

@Service
@Transactional(readOnly = true)
public class MemberBalanceService {

	public List<BalanceData> getSummary(int accountId, int year, Integer month) {
		// TODO Auto-generated method stub
		return null;
	}

}
