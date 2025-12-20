package com.jdc.balance.model;

import java.util.List;

public record PageResult<T>(
		List<T> contents,
		long count,
		int page,
		int size) {

}
