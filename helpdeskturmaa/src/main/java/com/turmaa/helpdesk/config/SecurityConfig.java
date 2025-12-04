package com.turmaa.helpdesk.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; 
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity; 
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.turmaa.helpdesk.security.JWTAuthenticationFilter;
import com.turmaa.helpdesk.security.JWTAuthorizationFilter; 
import com.turmaa.helpdesk.security.JWTUtil;

@EnableGlobalMethodSecurity(prePostEnabled = true) 
@Configuration 
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private static final String[] PUBLIC_MATCHERS = { "/h2-console/**", "/login" };

	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private JWTUtil jwtUtil;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
            http.headers().frameOptions().disable();
        }
		
		http.cors().and().csrf().disable();
		
		http.authorizeRequests()
			.antMatchers(PUBLIC_MATCHERS).permitAll()
            .antMatchers("/login").permitAll()
			
			// --- REGRAS DE PERMISSÃO ROBUSTAS ---
			// Usamos hasAnyAuthority para aceitar "ROLE_ADMIN" ou apenas "ADMIN"
			// Isso evita erros caso o Enum no banco esteja sem o prefixo.
			
			// 1. TÉCNICOS
			// GET: Admin e Técnico podem ver
			.antMatchers(HttpMethod.GET, "/tecnicos/**").hasAnyAuthority("ROLE_ADMIN", "ADMIN", "ROLE_TECNICO", "TECNICO")
			// Outros métodos: Só Admin
			.antMatchers("/tecnicos/**").hasAnyAuthority("ROLE_ADMIN", "ADMIN")
			
			// 2. CLIENTES
			// Tudo liberado para ambos
			.antMatchers("/clientes/**").hasAnyAuthority("ROLE_ADMIN", "ADMIN", "ROLE_TECNICO", "TECNICO")
			
			// 3. CHAMADOS
			// Tudo liberado para ambos
			.antMatchers("/chamados/**").hasAnyAuthority("ROLE_ADMIN", "ADMIN", "ROLE_TECNICO", "TECNICO")
			
			.anyRequest().authenticated();
		
		http.addFilter(new JWTAuthenticationFilter(authenticationManager(), jwtUtil));
		http.addFilter(new JWTAuthorizationFilter(authenticationManager(), jwtUtil, userDetailsService));
		
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
	}
	
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 1. Libera TODAS as origens (Frontend no Vercel, Localhost, Ngrok, etc)
        configuration.setAllowedOrigins(Arrays.asList("*"));
        
        // 2. Libera TODOS os métodos HTTP necessários
        configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
        
        // 3. Libera TODOS os cabeçalhos (Isso é CRÍTICO para o Token JWT passar)
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        // Aplica essa configuração para todas as rotas da API
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Autowired
	private org.springframework.core.env.Environment env;
}