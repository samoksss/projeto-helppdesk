package com.turmaa.helpdesk.domain.dtos;

import java.io.Serializable;
import java.time.LocalDate;

import com.turmaa.helpdesk.domain.Chamado;

public class ChamadoDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private LocalDate dataAbertura;
    private LocalDate dataFechamento;
    
    // MUDANÇA 1: Usar Integer para enviar o código (0, 1, 2)
    private Integer prioridade;
    private Integer status;
    
    private String titulo;
    private String observacoes;

    // MUDANÇA 2: Renomear para bater com o Frontend (cliente/tecnico)
    private Integer cliente;
    private Integer tecnico;
    
    // MUDANÇA 3: Campos para exibir nomes na tabela
    private String nomeCliente;
    private String nomeTecnico;

    public ChamadoDTO() {
        super();
    }

    public ChamadoDTO(Chamado obj) {
        this.id = obj.getId();
        this.dataAbertura = obj.getDataAbertura();
        this.dataFechamento = obj.getDataFechamento();
        
        // Pega apenas o código numérico dos Enums
        this.prioridade = (obj.getPrioridade() != null) ? obj.getPrioridade().getCodigo() : null;
        this.status = (obj.getStatus() != null) ? obj.getStatus().getCodigo() : null;
        
        this.titulo = obj.getTitulo();
        this.observacoes = obj.getObservacoes();
        
        // Mapeia os IDs
        this.cliente = (obj.getCliente() != null) ? obj.getCliente().getId() : null;
        this.tecnico = (obj.getTecnico() != null) ? obj.getTecnico().getId() : null;
        
        // Mapeia os Nomes para a Listagem
        this.nomeCliente = (obj.getCliente() != null) ? obj.getCliente().getNome() : null;
        this.nomeTecnico = (obj.getTecnico() != null) ? obj.getTecnico().getNome() : null;
    }

    // Getters e Setters atualizados
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public LocalDate getDataAbertura() { return dataAbertura; }
    public void setDataAbertura(LocalDate dataAbertura) { this.dataAbertura = dataAbertura; }

    public LocalDate getDataFechamento() { return dataFechamento; }
    public void setDataFechamento(LocalDate dataFechamento) { this.dataFechamento = dataFechamento; }

    public Integer getPrioridade() { return prioridade; }
    public void setPrioridade(Integer prioridade) { this.prioridade = prioridade; }

    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public Integer getCliente() { return cliente; }
    public void setCliente(Integer cliente) { this.cliente = cliente; }

    public Integer getTecnico() { return tecnico; }
    public void setTecnico(Integer tecnico) { this.tecnico = tecnico; }

    public String getNomeCliente() { return nomeCliente; }
    public void setNomeCliente(String nomeCliente) { this.nomeCliente = nomeCliente; }

    public String getNomeTecnico() { return nomeTecnico; }
    public void setNomeTecnico(String nomeTecnico) { this.nomeTecnico = nomeTecnico; }
}