package com.projetoViajante.mapper;

import org.springframework.stereotype.Component;

import com.projetoViajante.dto.UsuarioDTO;
import com.projetoViajante.entity.Usuario;

@Component
public class UsuarioMapper {

    public Usuario toEntity(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(dto.getSenha());
        return usuario;
    }

    public UsuarioDTO toDTO(Usuario entity) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(entity.getId());
        dto.setNome(entity.getNome());
        dto.setEmail(entity.getEmail());
        dto.setSenha(entity.getSenha());
        return dto;
    }

    public boolean validarSenha(String senha) {
        if (senha == null || senha.length() < 8) {
            return false;
        }

        boolean temMaiuscula = false;
        boolean temNumero = false;

        for (char c : senha.toCharArray()) {
            if (Character.isUpperCase(c)) {
                temMaiuscula = true;
            }
            if (Character.isDigit(c)) {
                temNumero = true;
            }
        }

        return temMaiuscula && temNumero;
    }

    public boolean validarEmail(String email) {
        if (email == null || email.isBlank()) {
            return false;
        }

        String validaEmail = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        return email.matches(validaEmail);
    }
}


