package com.jdc.weekend.rest.utils;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "app.jwt")
public class JwtTokenConfigProps {

	private String issuer;
	private int accessLife;
	private int refreshLife;
}
