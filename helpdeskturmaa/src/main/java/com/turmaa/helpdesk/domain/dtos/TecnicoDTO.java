package com.turmaa.helpdesk.domain.dtos;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.turmaa.helpdesk.domain.Tecnico;
import com.turmaa.helpdesk.domain.enums.Perfil;

public class TecnicoDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String nome;
    private String cpf;
    private String email;
    private String senha;
    
    // CORREÇÃO: Inicializar para evitar NullPointerException
    private Set<Integer> perfis = new HashSet<>();

    public TecnicoDTO() {
        super();
        addPerfil(Perfil.CLIENTE); // Todo usuário tem pelo menos perfil Cliente
    }

    public TecnicoDTO(Tecnico obj) {
        this.id = obj.getId();
        this.nome = obj.getNome();
        this.cpf = obj.getCpf();
        this.email = obj.getEmail();
        this.senha = obj.getSenha();
        this.perfis = obj.getPerfis().stream().map(x -> x.getCodigo()).collect(Collectors.toSet());
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public Set<Integer> getPerfis() { return perfis; }
    public void setPerfis(Set<Integer> perfis) { this.perfis = perfis; }

    public void addPerfil(Perfil perfil) {
        this.perfis.add(perfil.getCodigo());
    }
}