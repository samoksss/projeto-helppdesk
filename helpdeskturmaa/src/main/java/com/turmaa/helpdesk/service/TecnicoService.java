package com.turmaa.helpdesk.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.turmaa.helpdesk.domain.Pessoa;
import com.turmaa.helpdesk.domain.Tecnico;
import com.turmaa.helpdesk.domain.dtos.TecnicoDTO;
import com.turmaa.helpdesk.domain.enums.Perfil;
import com.turmaa.helpdesk.repositories.PessoaRepository; // Precisamos do repositório genérico de Pessoa
import com.turmaa.helpdesk.repositories.TecnicoRepository;
import com.turmaa.helpdesk.service.exceptions.DataIntegrityViolationException;
import com.turmaa.helpdesk.service.exceptions.ObjectNotFoundException;

@Service
public class TecnicoService {

    @Autowired
    private TecnicoRepository repository;
    
    @Autowired
    private PessoaRepository pessoaRepository; // Injete o PessoaRepository para validar CPF/Email geral
    
    @Autowired
    private BCryptPasswordEncoder encoder;

    public Tecnico findById(Integer id) {
        Optional<Tecnico> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id));
    }

    public List<Tecnico> findAll() {
        return repository.findAll();
    }

    public Tecnico create(TecnicoDTO objDTO) {
        objDTO.setId(null);
        objDTO.setSenha(encoder.encode(objDTO.getSenha()));
        
        // VALIDAÇÃO IMPORTANTE: Evita erro 500 se já existir CPF/Email
        validaPorCpfEEmail(objDTO);
        
        Tecnico newObj = new Tecnico(objDTO);
        
        // Salva os perfis adicionais
        if(objDTO.getPerfis() != null) {
             objDTO.getPerfis().forEach(perfilCodigo -> newObj.addPerfil(Perfil.toEnum(perfilCodigo)));
        }
        
        return repository.save(newObj);
    }

    public Tecnico update(Integer id, @Valid TecnicoDTO objDTO) {
        objDTO.setId(id);
        Tecnico oldObj = findById(id);
        
        // Valida duplicidade na atualização também
        validaPorCpfEEmail(objDTO);
        
        if(objDTO.getSenha() != null && !objDTO.getSenha().isEmpty()) {
             oldObj.setSenha(encoder.encode(objDTO.getSenha()));
        }

        oldObj.setNome(objDTO.getNome());
        oldObj.setCpf(objDTO.getCpf());
        oldObj.setEmail(objDTO.getEmail());
        
        if(objDTO.getPerfis() != null) {
            // Nota: Se a classe Pessoa tiver o Set inicializado, isso funciona. 
            // Senão, é bom limpar e adicionar.
            // oldObj.getPerfis().clear(); 
            objDTO.getPerfis().forEach(perfilCodigo -> oldObj.addPerfil(Perfil.toEnum(perfilCodigo)));
        }

        return repository.save(oldObj);
    }

    public void delete(Integer id) {
        Tecnico obj = findById(id);
        if (obj.getChamados().size() > 0) {
            throw new DataIntegrityViolationException("Técnico possui ordens de serviço e não pode ser deletado!");
        }
        repository.deleteById(id);
    }

    // Lógica para verificar se CPF ou E-mail já existem no banco (em qualquer Pessoa)
    private void validaPorCpfEEmail(TecnicoDTO objDTO) {
        Optional<Pessoa> obj = pessoaRepository.findByCpf(objDTO.getCpf());
        if (obj.isPresent() && obj.get().getId() != objDTO.getId()) {
            throw new DataIntegrityViolationException("CPF já cadastrado no sistema!");
        }

        obj = pessoaRepository.findByEmail(objDTO.getEmail());
        if (obj.isPresent() && obj.get().getId() != objDTO.getId()) {
            throw new DataIntegrityViolationException("E-mail já cadastrado no sistema!");
        }
    }
}