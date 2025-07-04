import { useState, useEffect, useCallback } from "react";

export default function useViagens(usuarioId) {
  const [viagens, setViagens] = useState([]);
  const [erro, setErro] = useState(null);

  const [novaViagem, setNovaViagem] = useState({
    titulo: "",
    dataPartida: "",
    dataChegada: "",
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
  });

  const [editandoId, setEditandoId] = useState(null);

  const [formEdicao, setFormEdicao] = useState({
    titulo: "",
    dataPartida: "",
    dataChegada: "",
  });

  const buscarViagens = useCallback(async () => {
    try {
      const resp = await fetch(`http://localhost:8080/viagem/usuario/${usuarioId}`);
      if (!resp.ok) throw new Error("Erro ao buscar viagens");
      const dados = await resp.json();
      setViagens(Array.isArray(dados) ? dados : [dados]);
      setErro(null);
    } catch (err) {
      console.log(err);
    }
  }, [usuarioId]);

  const preencherEnderecoViaCep = useCallback(async () => {
    if (!/^\d{8}$/.test(novaViagem.cep)) return;

    try {
      const resposta = await fetch(`https://opencep.com/v1/${novaViagem.cep}`);
      if (!resposta.ok) throw new Error("Erro ao buscar CEP");
      const dados = await resposta.json();

      setNovaViagem((prev) => ({
        ...prev,
        rua: dados.logradouro || "",
        bairro: dados.bairro || "",
        cidade: dados.localidade || "",
        estado: dados.uf || "",
      }));
      setErro(null);
    } catch (e) {
      setErro(`Erro ao preencher endereço: ${e.message}`);
    }
  }, [novaViagem.cep]);

  useEffect(() => {
    if (usuarioId) buscarViagens();
  }, [usuarioId, buscarViagens]);

  useEffect(() => {
    if (novaViagem.cep && novaViagem.cep.length === 8) {
      preencherEnderecoViaCep();
    }
  }, [novaViagem.cep, preencherEnderecoViaCep]);

  const cadastrarViagem = async () => {
    try {
      const resp = await fetch("http://localhost:8080/viagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...novaViagem, usuarioId }),
      });
      if (!resp.ok) throw new Error("Erro ao cadastrar viagem");
      setNovaViagem({
        titulo: "",
        dataPartida: "",
        dataChegada: "",
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        numero: "",
      });
      setErro(null);
      await buscarViagens();
    } catch (err) {
      setErro(err.message);
    }
  };

  const salvarEdicao = async () => {
    try {
      const resp = await fetch(`http://localhost:8080/viagem/${editandoId}/usuario/${usuarioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEdicao),
      });
      if (!resp.ok) throw new Error("Erro ao salvar edição");
      setEditandoId(null);
      setErro(null);
      await buscarViagens();
    } catch (err) {
      setErro(err.message);
    }
  };

const deletarViagem = async (id) => {
  try {
    const resp = await fetch(`http://localhost:8080/viagem/${id}/usuario/${usuarioId}`, {
      method: "DELETE",
    });
    if (!resp.ok) throw new Error("Erro ao deletar viagem");

    // Remove a viagem do estado diretamente:
    setViagens((prev) => prev.filter((v) => v.id !== id));

    setErro(null);
  } catch (err) {
    setErro(err.message);
  }
};



  return {
    viagens,
    erro,
    novaViagem,
    setNovaViagem,
    cadastrarViagem,
    editandoId,
    setEditandoId,
    formEdicao,
    setFormEdicao,
    salvarEdicao,
    deletarViagem,
  };
}
