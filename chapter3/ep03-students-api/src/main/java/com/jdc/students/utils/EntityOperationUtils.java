package com.jdc.students.utils;

import java.util.Optional;

public class EntityOperationUtils {

	public static <T> T safeCall(Optional<T> optional, String entity, String column, Object id) {
		return optional.orElseThrow(() -> new StudentBusinessException("There is no %s with %s : %s.".formatted(entity, column, id)));
	}
}
