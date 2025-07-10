import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Configuracoes.css";
import ToastGeral from "../Toast/ToastGeral";

const Configuracoes = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [usuarioId, setUsuarioId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
      navigate("/login");
      return;
    }
    setUsuarioId(usuarioLogado.id);
    buscarDados(usuarioLogado.id);
  }, [navigate]);

  const buscarDados = (id) => {
    fetch(`http://localhost:8080/usuario/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setNome(data.nome);
        setEmail(data.email);
      })
      .catch(() => toast.error("Erro ao buscar dados do usuário."));
  };

  const validarSenha = (senha) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(senha);
  };
  const handleAtualizar = (e) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim()) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (novaSenha || confirmarSenha) {
      if (!validarSenha(novaSenha)) {
        toast.error("A nova senha deve ter no mínimo 8 caracteres, ao menos 1 letra maiúscula e 1 número.");
        return;
      }
      if (novaSenha !== confirmarSenha) {
        toast.error("As senhas não coincidem.");
        return;
      }
    }

    const dadosAtualizados = {
      nome,
      email,
    };


    if (novaSenha) {
      dadosAtualizados.novaSenha = novaSenha;
    }

    fetch(`http://localhost:8080/usuario/${usuarioId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosAtualizados),
    })
      .then(async (res) => {
        if (!res.ok) {
          const erroTexto = await res.text();
          throw new Error(erroTexto);
        }
        return res.json();
      })
      .then((data) => {
        toast.success("Dados atualizados com sucesso!");


        const usuarioAtualizado = { id: usuarioId, nome: data.nome };
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));

        setNovaSenha("");
        setConfirmarSenha("");
      })
      .catch((error) => {
        if (error.message.includes("E-mail já cadastrado")) {
          toast.error("Este e-mail já está em uso. Por favor, escolha outro.");
        } else {
          toast.error(error.message || "Erro ao atualizar dados.");
        }
      });
  };


  const confirmarExclusao = () => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.");
    if (confirmacao) excluirConta();
  };

  const excluirConta = () => {
    fetch(`http://localhost:8080/usuario/${usuarioId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          toast.success("Conta excluída com sucesso!");
          localStorage.removeItem("usuarioLogado");
          setTimeout(() => navigate("/"), 2000);
        } else {
          throw new Error();
        }
      })
      .catch(() => toast.error("Erro ao excluir conta."));
  };

  return (
    <div className="configuracoes-container">
      <h2>Configurações da Conta</h2>
      <form onSubmit={handleAtualizar} className="form-configuracoes">
        <div className="form-group-config">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group-config">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group-config">
          <label>Nova Senha:</label>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            placeholder="Deixe em branco para manter a atual"
          />
        </div>

        <div className="form-group-config">
          <label>Confirmar Nova Senha:</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirme a nova senha"
          />
        </div>

        <button type="submit" className="btn-salvar">
          Salvar Alterações
        </button>

        <button className="btn-excluir" onClick={confirmarExclusao}>
          Excluir Conta
        </button>
      </form>



      <ToastGeral />
    </div>
  );
};

export default Configuracoes;
