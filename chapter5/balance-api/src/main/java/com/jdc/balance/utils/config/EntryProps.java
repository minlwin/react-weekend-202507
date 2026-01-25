package com.jdc.balance.utils.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "app.entry")
public class EntryProps {

	private int cutOffDate;
}
