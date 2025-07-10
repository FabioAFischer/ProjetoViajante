package com.projetoViajante.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "MochilaItem")
public class MochilaItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Long quantidade;
    private String descricao;



    @ManyToOne
    @JoinColumn(name = "mochila_id")
    @JsonBackReference(value = "mochila-mochilaItem")
    private Mochila mochila;

    public MochilaItem() {
    }

    public MochilaItem(Long id, String nome, Long quantidade, String descricao, Viagem viagem, Usuario usuario,
            Mochila mochila) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.descricao = descricao;
        this.mochila = mochila;
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


    public Mochila getMochila() {
        return mochila;
    }

    public void setMochila(Mochila mochila) {
        this.mochila = mochila;
    }

}
