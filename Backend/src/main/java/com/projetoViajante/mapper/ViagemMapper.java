package com.projetoViajante.mapper;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

import org.springframework.stereotype.Component;

import com.projetoViajante.dto.ViagemDTO;
import com.projetoViajante.entity.Usuario;
import com.projetoViajante.entity.Viagem;

@Component
public class ViagemMapper {

    public Viagem toEntity(ViagemDTO dto) {

        validarDatas(dto.getDataPartida(), dto.getDataChegada());

        Viagem viagem = new Viagem();
        viagem.setTitulo(dto.getTitulo());
        viagem.setDataPartida(dto.getDataPartida());
        viagem.setDataChegada(dto.getDataChegada());
        viagem.setCep(dto.getCep());
        viagem.setRua(dto.getRua());
        viagem.setBairro(dto.getBairro());
        viagem.setNumero(dto.getNumero());
        viagem.setCidade(dto.getCidade());
        viagem.setEstado(dto.getEstado());

        if (dto.getUsuarioId() != null) {
            Usuario usuario = new Usuario();
            usuario.setId(dto.getUsuarioId());
            viagem.setUsuario(usuario);
        }

        return viagem;
    }

    public ViagemDTO toDTO(Viagem entity) {
        ViagemDTO dto = new ViagemDTO(
            entity.getId(),
            entity.getTitulo(),
            entity.getDataPartida(),
            entity.getDataChegada(),
            entity.getCep(),
            entity.getRua(),
            entity.getBairro(),
            entity.getNumero(),
            entity.getCidade(),
            entity.getEstado(),
            entity.getUsuario() != null ? entity.getUsuario().getId() : null
        );

        return dto;
    }

    public void validarDatas(String dataPartidaStr, String dataChegadaStr) {

        if (dataPartidaStr == null || dataPartidaStr.isBlank() || dataChegadaStr == null || dataChegadaStr.isBlank()) {
            throw new IllegalArgumentException("Datas de partida e chegada são obrigatórias.");
        }

        LocalDate dataPartida;
        LocalDate dataChegada;

        try {
            dataPartida = LocalDate.parse(dataPartidaStr);
            dataChegada = LocalDate.parse(dataChegadaStr);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Formato de data inválido. Esperado: AAAA-MM-DD.");
        }

        LocalDate hoje = LocalDate.now();

        if (dataPartida.isBefore(hoje)) {
            throw new IllegalArgumentException("A data de partida não pode ser no passado.");
        }

        if (dataChegada.isBefore(hoje)) {
            throw new IllegalArgumentException("A data de chegada não pode ser no passado.");
        }

        if (dataChegada.isBefore(dataPartida)) {
            throw new IllegalArgumentException("A data de chegada não pode ser anterior à data de partida.");
        }
    }
}
