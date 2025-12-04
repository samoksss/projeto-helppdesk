package com.turmaa.helpdesk.domain;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.turmaa.helpdesk.domain.dtos.ChamadoDTO;
import com.turmaa.helpdesk.domain.enums.Prioridade;
import com.turmaa.helpdesk.domain.enums.Status;

@Entity
public class Chamado implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataAbertura = LocalDate.now();

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataFechamento;

    private Integer prioridade;  
    private Integer status;      

    private String titulo;
    private String observacoes;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private Tecnico tecnico;

    public Chamado() {
        super();
    }

    public Chamado(Integer id, Prioridade prioridade, Status status, String titulo,
                   String observacoes, Cliente cliente, Tecnico tecnico) {
        super();
        this.id = id;
        this.prioridade = (prioridade == null) ? null : prioridade.getCodigo();
        this.status = (status == null) ? null : status.getCodigo();
        this.titulo = titulo;
        this.observacoes = observacoes;
        this.cliente = cliente;
        this.tecnico = tecnico;
    }
    
    // CORREÇÃO NO CONSTRUTOR DO DTO
    public Chamado(ChamadoDTO obj) {
        super();
        this.id = obj.getId();
        
        // CORREÇÃO: Como o DTO agora retorna Integer, não usamos .getCodigo()
        this.prioridade = obj.getPrioridade(); 
        this.status = obj.getStatus();
        
        this.titulo = obj.getTitulo();
        this.observacoes = obj.getObservacoes();
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public LocalDate getDataAbertura() { return dataAbertura; }
    public void setDataAbertura(LocalDate dataAbertura) { this.dataAbertura = dataAbertura; }

    public LocalDate getDataFechamento() { return dataFechamento; }
    public void setDataFechamento(LocalDate dataFechamento) { this.dataFechamento = dataFechamento; }

    // Getters e Setters continuam usando a lógica de conversão para manter a integridade
    public Prioridade getPrioridade() { return Prioridade.toEnum(prioridade); }
    public void setPrioridade(Prioridade p) { this.prioridade = (p == null ? null : p.getCodigo()); }

    public Status getStatus() { return Status.toEnum(status); }
    public void setStatus(Status s) { this.status = (s == null ? null : s.getCodigo()); }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public Tecnico getTecnico() { return tecnico; }
    public void setTecnico(Tecnico tecnico) { this.tecnico = tecnico; }
}