package com.jdc.balance.utils.export;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.jdc.balance.api.member.output.BalanceListItem;

public class BalanceReportExporter {

	public static byte[] export(List<BalanceListItem> list) {
		
		try (var workBook = new XSSFWorkbook();
				var outputStream = new ByteArrayOutputStream()){
			
			var sheet = workBook.createSheet("Balance Report");
			
			int rowIndex = 0;
			var headerRow = sheet.createRow(rowIndex ++);
			
			for(var i = 0; i < BalanceListItem.headers().length; i ++) {
				headerRow.createCell(i).setCellValue(BalanceListItem.headers()[i]);
			}
			
			
			for(var balance : list) {
				var row = sheet.createRow(rowIndex ++);
				row.createCell(0).setCellValue(balance.getIdCode());
				row.createCell(1).setCellValue(balance.getLedger());
				row.createCell(2).setCellValue(balance.particular());
				row.createCell(3).setCellValue(balance.getDebit());
				row.createCell(4).setCellValue(balance.getCredit());
				row.createCell(6).setCellValue(balance.getBalance());
			}
			
			workBook.write(outputStream);
			return outputStream.toByteArray();
			
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
	}
}
