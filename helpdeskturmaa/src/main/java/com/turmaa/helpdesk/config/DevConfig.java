package com.turmaa.helpdesk.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.turmaa.helpdesk.service.DBService;

@Configuration
@Profile("dev")
public class DevConfig {

    @Autowired
    private DBService dbService;

    // Lê o valor do application-dev.properties
    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;

    /**
     * Quando estiver "create", cria as tabelas e dados.
     * Quando estiver "none", não recria nem repovoa.
     */
    @Bean
    public boolean instanciaDB() {
        if ("create".equalsIgnoreCase(ddlAuto)) {
            dbService.instanciaDB();
            return true;
        }
        return false;
    }
}


