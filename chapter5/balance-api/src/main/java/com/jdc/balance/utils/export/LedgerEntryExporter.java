package com.jdc.balance.utils.export;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.jdc.balance.api.member.output.BalanceListItem;
import com.jdc.balance.api.member.output.EntryListItem;

public class LedgerEntryExporter {

	public static byte[] export(List<EntryListItem> list) {
		
		try(var workbook = new XSSFWorkbook();
				var output = new ByteArrayOutputStream()) {
			
			var sheet = workbook.createSheet("Ledger Entry");
			var rowIndex = 0;
			
			var headerRow = sheet.createRow(rowIndex ++);
			
			for(var i = 0; i < EntryListItem.headers().length; i ++) {
				headerRow.createCell(i).setCellValue(BalanceListItem.headers()[i]);
			}
			
			for(var entry : list) {
				var row = sheet.createRow(rowIndex ++);
				row.createCell(0).setCellValue(entry.id().getCode());
				row.createCell(1).setCellValue(entry.ledgerType().name());
				row.createCell(2).setCellValue(entry.ledgerCode());
				row.createCell(3).setCellValue(entry.ledgerName());
				row.createCell(4).setCellValue(entry.particular());
				row.createCell(6).setCellValue(entry.amount());
			}
			
			workbook.write(output);
			return output.toByteArray();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}
}
