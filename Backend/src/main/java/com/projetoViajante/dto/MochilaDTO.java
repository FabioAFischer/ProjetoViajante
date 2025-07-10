package com.projetoViajante.dto;

public class MochilaDTO {

    private Long id;
    private String titulo;
    private Long pesoTotalAprox;
    private Long viagemId;
    private Long usuarioId;
    private Long mochilaItemId;

    public MochilaDTO() {
    }

    public MochilaDTO(Long id, Long mochilaItemId, Long pesoTotalAprox, String titulo, Long usuarioId, Long viagemId) {
        this.id = id;
        this.mochilaItemId = mochilaItemId;
        this.pesoTotalAprox = pesoTotalAprox;
        this.titulo = titulo;
        this.usuarioId = usuarioId;
        this.viagemId = viagemId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Long getPesoTotalAprox() {
        return pesoTotalAprox;
    }

    public void setPesoTotalAprox(Long pesoTotalAprox) {
        this.pesoTotalAprox = pesoTotalAprox;
    }

    public Long getViagemId() {
        return viagemId;
    }

    public void setViagemId(Long viagemId) {
        this.viagemId = viagemId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getMochilaItemId() {
        return mochilaItemId;
    }

    public void setMochilaItemId(Long mochilaItemId) {
        this.mochilaItemId = mochilaItemId;
    }

}
