package com.turmaa.helpdesk.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.turmaa.helpdesk.service.DBService;

@Configuration
@Profile("test") // Garante que este bean só seja ativado no perfil 'test'
public class TestConfig {

	@Autowired
	private DBService dbService;

	@Bean
	public boolean instanciaDB() {
		this.dbService.instanciaDB();
		return true;
	}
}