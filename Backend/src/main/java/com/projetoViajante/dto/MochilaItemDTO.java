package com.projetoViajante.dto;

public class MochilaItemDTO {

    private Long id;
    private String nome;
    private Long quantidade;
    private String descricao;
    private Long mochilaId;
    private Long usuarioId;
    
    public MochilaItemDTO() {
    }


 

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }




    public MochilaItemDTO(Long id, String nome, Long quantidade, String descricao, Long mochilaId, Long usuarioId) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.descricao = descricao;
        this.mochilaId = mochilaId;
        this.usuarioId = usuarioId;
    }




    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }




    public Long getMochilaId() {
        return mochilaId;
    }




    public void setMochilaId(Long mochilaId) {
        this.mochilaId = mochilaId;
    }

    
    
}
