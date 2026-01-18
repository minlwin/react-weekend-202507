package com.jdc.balance.utils;

import java.util.Optional;

import com.jdc.balance.utils.exceptions.BusinessException;

public class Nullsafe {

	public static <T, ID> T call(Optional<T> optional, String type, ID id) {
		return optional.orElseThrow(() -> new BusinessException("There is no %s with id %s.".formatted(type, id)));
	}
}
