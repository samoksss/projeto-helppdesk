package com.turmaa.helpdesk.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.turmaa.helpdesk.domain.Tecnico;

public interface TecnicoRepository extends JpaRepository<Tecnico, Integer> {
    Optional<Tecnico> findByCpf(String cpf);
}