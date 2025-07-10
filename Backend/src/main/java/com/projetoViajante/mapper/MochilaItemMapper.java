package com.projetoViajante.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.projetoViajante.dto.MochilaItemDTO;
import com.projetoViajante.entity.MochilaItem;

public class MochilaItemMapper {

    public static MochilaItemDTO toDTO(MochilaItem entity) {
        if (entity == null) return null;

        return new MochilaItemDTO(
            entity.getId(),
            entity.getNome(),
            entity.getQuantidade(),
            entity.getDescricao(),
            entity.getMochila() != null ? entity.getMochila().getId() : null,
            entity.getMochila() != null ? entity.getMochila().getUsuario().getId() : null
        );
    }

    public static MochilaItem toEntity(MochilaItemDTO dto) {
        if (dto == null) return null;

        MochilaItem item = new MochilaItem();
        item.setId(dto.getId());
        item.setNome(dto.getNome());
        item.setQuantidade(dto.getQuantidade());
        item.setDescricao(dto.getDescricao());
        return item;
    }

    public static List<MochilaItemDTO> toDTOList(List<MochilaItem> entities) {
        return entities.stream()
            .map(MochilaItemMapper::toDTO)
            .collect(Collectors.toList());
    }

    public static List<MochilaItem> toEntityList(List<MochilaItemDTO> dtos) {
        return dtos.stream()
            .map(MochilaItemMapper::toEntity)
            .collect(Collectors.toList());
    }
}