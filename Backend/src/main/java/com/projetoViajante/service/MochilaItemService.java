package com.projetoViajante.service;

import java.util.List;

import com.projetoViajante.dto.MochilaItemDTO;
import com.projetoViajante.entity.MochilaItem;

public interface MochilaItemService {

    MochilaItem salvarMochilaItem(MochilaItemDTO mochilaItemDTO);

    List<MochilaItem> listarMochilaItem(Long mochilaId);

    MochilaItem atualizarMochilaItem(Long id, MochilaItemDTO mochilaItemDTO);

    void deletarMochilaItem(Long idMochilaItem);
}
