package com.jdc.balance.utils.dto;

import java.util.ArrayList;
import java.util.List;

public record PageResult<T>(
		List<T> contents,
		Long count,
		int page,
		int size) {

	public int getTotalPages() {
		var mod = count.intValue() % size;
		var value = count.intValue() / size;
		return mod == 0 ? value : value + 1;
	}
	
	public List<Integer> getLinks() {
		
		var links = new ArrayList<Integer>();
		
		if(count > 0) {
			var lastIndex = getTotalPages() - 1;
			
			links.add(page);
			
			while(links.size() < 3 && links.getFirst() > 0) {
				links.addFirst(links.getFirst() - 1);
			}
			
			while(links.size() < 5 && links.getLast() < lastIndex) {
				links.addLast(links.getLast() + 1);
			}
			
			while(links.size() < 5 && links.getFirst() > 0) {
				links.addFirst(links.getFirst() - 1);
			}
		}
		
		return links;
	}
}
