package com.jdc.balance.api.member.output;

import java.util.List;

public record LedgerUploadResult(
		int created,
		int skipped,
		int error,
		List<LedgerUploadItem> details) {

}
