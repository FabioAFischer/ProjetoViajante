package com.projetoViajante.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoViajante.dto.MochilaItemDTO;
import com.projetoViajante.entity.Mochila;
import com.projetoViajante.entity.MochilaItem;
import com.projetoViajante.entity.Usuario;
import com.projetoViajante.mapper.MochilaItemMapper;
import com.projetoViajante.repository.MochilaItemRepo;
import com.projetoViajante.repository.MochilaRepo;
import com.projetoViajante.repository.UsuarioRepo;
import com.projetoViajante.service.MochilaItemService;
@Service
public class MochilaItemServiceImp implements MochilaItemService {

    @Autowired
    private MochilaItemRepo mochilaItemRepo;

    @Autowired
    private MochilaRepo mochilaRepo;

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Override
    public MochilaItem salvarMochilaItem(MochilaItemDTO mochilaItemDTO) {
        if (mochilaItemDTO.getMochilaId() == null) {
            throw new RuntimeException("Mochila inválida: ID é obrigatório");
        }

        if (mochilaItemDTO.getUsuarioId() == null) {
            throw new RuntimeException("Usuário inválido: ID é obrigatório");
        }

        Mochila mochila = mochilaRepo.findById(mochilaItemDTO.getMochilaId())
                .orElseThrow(() -> new RuntimeException("Mochila não encontrada com id " + mochilaItemDTO.getMochilaId()));

        Usuario usuario = usuarioRepo.findById(mochilaItemDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id " + mochilaItemDTO.getUsuarioId()));

        MochilaItem mochilaItem = MochilaItemMapper.toEntity(mochilaItemDTO);
        mochilaItem.setMochila(mochila);
        return mochilaItemRepo.save(mochilaItem);
    }

    @Override
    public List<MochilaItem> listarMochilaItem(Long mochilaId) {
        return mochilaItemRepo.findByMochilaId(mochilaId);
    }

    @Override
    public MochilaItem atualizarMochilaItem(Long idMochilaItem, MochilaItemDTO mochilaItemDTO) {
        MochilaItem mochilaItem = mochilaItemRepo.findById(idMochilaItem)
                .orElseThrow(() -> new RuntimeException("Item não encontrado com o ID: " + idMochilaItem));

        mochilaItem.setNome(mochilaItemDTO.getNome());
        mochilaItem.setQuantidade(mochilaItemDTO.getQuantidade());
        mochilaItem.setDescricao(mochilaItemDTO.getDescricao());

        return mochilaItemRepo.save(mochilaItem);
    }

    @Override
    public void deletarMochilaItem(Long idMochilaItem) {
        mochilaItemRepo.deleteById(idMochilaItem);
    }
}