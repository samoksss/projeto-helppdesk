package com.turmaa.helpdesk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.turmaa.helpdesk.domain.Chamado;
import com.turmaa.helpdesk.domain.Cliente;
import com.turmaa.helpdesk.domain.Tecnico;
import com.turmaa.helpdesk.domain.enums.Perfil;
import com.turmaa.helpdesk.domain.enums.Prioridade;
import com.turmaa.helpdesk.domain.enums.Status;
import com.turmaa.helpdesk.repositories.ClienteRepository;
import com.turmaa.helpdesk.repositories.TecnicoRepository;
import com.turmaa.helpdesk.repositories.ChamadoRepository;

@SpringBootApplication
public class HelpdeskturmaaApplication implements CommandLineRunner {

    @Autowired
    private TecnicoRepository tecnicoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ChamadoRepository chamadoRepository;

    public static void main(String[] args) {
        SpringApplication.run(HelpdeskturmaaApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Tecnico tec1 = new Tecnico(null, "Bill Gates", "706.457.770-93", "bill@mail.com", "123");
        tec1.addPerfil(Perfil.ADMIN);

        Cliente cli1 = new Cliente(null, "Linus Torvalds", "705.117.410-13", "linus@mail.com", "123");

        Chamado ch1 = new Chamado(null, Prioridade.MEDIA, Status.ANDAMENTO,
                "Chamado 01", "Primeiro chamado", cli1, tec1);

        tecnicoRepository.save(tec1);
        clienteRepository.save(cli1);
        chamadoRepository.save(ch1);
    }
}
