package com.jdc.balance.utils.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "app.admin")
public class AdminUserProps {

	private String username;
	private String password;
}
