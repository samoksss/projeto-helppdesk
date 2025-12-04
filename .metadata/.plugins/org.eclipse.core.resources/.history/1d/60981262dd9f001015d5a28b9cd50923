package com.turmaa.helpdesk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.turmaa.helpdesk.domain.Chamado;
import com.turmaa.helpdesk.domain.Cliente;
import com.turmaa.helpdesk.domain.Tecnico;
import com.turmaa.helpdesk.domain.enums.Perfil;
import com.turmaa.helpdesk.domain.enums.Prioridade;
import com.turmaa.helpdesk.domain.enums.Status;
import com.turmaa.helpdesk.repositories.ChamadoRepository;
import com.turmaa.helpdesk.repositories.ClienteRepository;
import com.turmaa.helpdesk.repositories.TecnicoRepository;

@Service
public class DBService {

    @Autowired private TecnicoRepository tecnicoRepository;
    @Autowired private ClienteRepository clienteRepository;
    @Autowired private ChamadoRepository chamadoRepository;

    // Encoder para salvar as senhas hasheadas
    @Autowired private BCryptPasswordEncoder encoder;

    /** Cria as instâncias de teste (tecnico, cliente e chamado) */
    public void instanciaDB() {
        Tecnico tec1 = new Tecnico(
            null, "Bill Gates", "706.457.770-93", "bill@mail.com", encoder.encode("123")
        );
        tec1.addPerfil(Perfil.ADMIN);

        Cliente cli1 = new Cliente(
            null, "Linus Torvalds", "705.117.410-13", "linus@mail.com", encoder.encode("123")
        );

        Chamado ch1 = new Chamado(
            null, Prioridade.MEDIA, Status.ANDAMENTO,
            "Chamado 01", "Primeiro chamado", cli1, tec1
        );

        tecnicoRepository.save(tec1);
        clienteRepository.save(cli1);
        chamadoRepository.save(ch1);
    }
}
