package com.turmaa.helpdesk.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.turmaa.helpdesk.domain.Chamado;
import com.turmaa.helpdesk.domain.Cliente;
import com.turmaa.helpdesk.domain.Tecnico;
import com.turmaa.helpdesk.domain.dtos.ChamadoDTO;
import com.turmaa.helpdesk.domain.enums.Prioridade; // Importante
import com.turmaa.helpdesk.domain.enums.Status;     // Importante
import com.turmaa.helpdesk.repositories.ChamadoRepository;
import com.turmaa.helpdesk.service.exceptions.ObjectNotFoundException;

@Service
public class ChamadoService {

    @Autowired
    private ChamadoRepository chamadoRepository;
    @Autowired
    private TecnicoService tecnicoService;
    @Autowired
    private ClienteService clienteService;

    public Chamado findById(Integer id) {
        Optional<Chamado> obj = chamadoRepository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! ID: " + id));
    }

    public List<Chamado> findAll() {
        return chamadoRepository.findAll();
    }

    public Chamado create(ChamadoDTO objDTO) {
        return chamadoRepository.save(newChamado(objDTO));
    }

    public Chamado update(Integer id, ChamadoDTO objDTO) {
        objDTO.setId(id);
        Chamado oldObj = findById(id);
        
        oldObj = newChamado(objDTO);
        oldObj.setId(id); // Garante o ID
        
        return chamadoRepository.save(oldObj);
    }
    
    // Método Delete (mantive sua lógica)
    public void delete(Integer id) {
        Chamado obj = findById(id);
        // Regra: Só deleta se estiver ENCERRADO (Código 2)
        if (obj.getStatus().getCodigo() != 2) {
            throw new IllegalArgumentException("Chamado não pode ser deletado, pois não está ENCERRADO.");
        }
        chamadoRepository.deleteById(id);
    }

    private Chamado newChamado(ChamadoDTO objDTO) {
        // CORREÇÃO 1: Usar getTecnico() e getCliente() (novos nomes do DTO)
        Tecnico tecnico = tecnicoService.findById(objDTO.getTecnico());
        Cliente cliente = clienteService.findById(objDTO.getCliente());

        Chamado chamado = new Chamado();
        
        if (objDTO.getId() != null) {
            chamado.setId(objDTO.getId());
        }
        
        // Se o status for 2 (Encerrado), define data de fechamento. Senão, nulo.
        if (objDTO.getStatus().equals(2)) {
            chamado.setDataFechamento(LocalDate.now());
        } else {
             chamado.setDataFechamento(null);
        }

        chamado.setTecnico(tecnico);
        chamado.setCliente(cliente);
        
        // CORREÇÃO 2: Converter o Integer do DTO para o Enum da Entidade
        chamado.setPrioridade(Prioridade.toEnum(objDTO.getPrioridade()));
        chamado.setStatus(Status.toEnum(objDTO.getStatus()));
        
        chamado.setTitulo(objDTO.getTitulo());
        chamado.setObservacoes(objDTO.getObservacoes());
        
        return chamado;
    }
}