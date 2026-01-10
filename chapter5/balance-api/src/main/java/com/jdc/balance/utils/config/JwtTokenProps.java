package com.jdc.balance.utils.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "app.jwt")
public class JwtTokenProps {

	private String issuer;
	private int accessLife;
	private int refreshLife;
}
