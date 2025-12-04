package com.turmaa.helpdesk.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.turmaa.helpdesk.domain.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
    
    // Método necessário para validar duplicidade de CPF no TecnicoService
    Optional<Pessoa> findByCpf(String cpf);
    
    // Método usado pelo Spring Security para login
    Optional<Pessoa> findByEmail(String email);

}