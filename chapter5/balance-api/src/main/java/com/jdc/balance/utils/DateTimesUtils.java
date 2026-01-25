package com.jdc.balance.utils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class DateTimesUtils {

	public static LocalDateTime toLocal(Instant instant) {
		if(null != instant) {
			return LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
		}
		return null;
	}
}
