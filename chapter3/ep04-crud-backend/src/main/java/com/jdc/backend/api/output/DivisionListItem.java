package com.jdc.backend.api.output;

import com.jdc.backend.model.entity.Division.Region;

public record DivisionListItem(
		int id,
		String name,
		String capital,
		Region region) {
}
