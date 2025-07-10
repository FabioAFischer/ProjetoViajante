import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Despesas.css';
import SelectViagem from '../../../components/Viagem/SelectViagem';
import TituloComBotao from '../../../components/Viagem/TituloComBotao';
import ToastGeral from '../../../components/Toast/ToastGeral';

const Despesas = () => {
    const [viagens, setViagens] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [viagemSelecionadaId, setViagemSelecionadaId] = useState('');
    const [novaDespesaNome, setNovaDespesaNome] = useState('');
    const [novaDespesaPreco, setNovaDespesaPreco] = useState('');
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('usuarioLogado'));
        setUsuario(user);
    }, []);

    useEffect(() => {
        if (!usuario) return;

        fetch(`http://localhost:8080/viagem/usuario/${usuario.id}`)
            .then(res => res.status === 204 ? [] : res.json())
            .then(data => setViagens(Array.isArray(data) ? data : []))
            .catch(() => toast.error("Erro ao carregar viagens"));
    }, [usuario?.id]);

    useEffect(() => {
        if (!viagemSelecionadaId) {
            setDespesas([]);
            return;
        }
        fetch(`http://localhost:8080/despesa/${viagemSelecionadaId}`)
            .then(res => res.status === 204 ? [] : res.json())
            .then(data => setDespesas(Array.isArray(data) ? data : []))
            .catch(() => toast.error("Erro ao carregar despesas"));
    }, [viagemSelecionadaId]);

    const calcularTotal = () => despesas.reduce((total, despesa) => total + (despesa.preco || 0), 0);

    const handleAdicionarDespesa = (e) => {
        e.preventDefault();

        if (!novaDespesaNome || !novaDespesaPreco || isNaN(novaDespesaPreco)) {
            toast.error("Preencha nome e valor válido.");
            return;
        }
        if (!viagemSelecionadaId || isNaN(Number(viagemSelecionadaId))) {
            toast.error("Selecione uma viagem válida.");
            return;
        }

        const nova = {
            nome: novaDespesaNome,
            preco: Number(novaDespesaPreco),
            viagemId: Number(viagemSelecionadaId),
            usuarioId: usuario.id
        };

        console.log("Nova despesa:", nova);

        fetch("http://localhost:8080/despesa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nova)
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => {
                toast.success("Despesa adicionada!");
                setDespesas(prev => [...prev, data]);
                setNovaDespesaNome('');
                setNovaDespesaPreco('');
            })
            .catch(() => toast.error("Erro ao adicionar despesa."));
    };

    const handleExcluirDespesa = (id) => {

        fetch(`http://localhost:8080/despesa/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error();
                setDespesas(prev => prev.filter(d => d.id !== id));
                toast.success("Despesa excluída.");
            })
            .catch(() => toast.error("Erro ao excluir despesa."));
    };

    return (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '1rem' }}>

            <ToastGeral />

            <TituloComBotao titulo="Despesas" mostrarBotao={false} />


            <SelectViagem
                viagens={viagens}
                viagemSelecionadaId={viagemSelecionadaId}
                setViagemSelecionadaId={setViagemSelecionadaId}
            />

            {viagemSelecionadaId && (
                <>
                    <form onSubmit={handleAdicionarDespesa} className="form-viagem">
                        <input
                            type="text"
                            placeholder="Nome da despesa"
                            value={novaDespesaNome}
                            onChange={(e) => setNovaDespesaNome(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Valor"
                            value={novaDespesaPreco}
                            onChange={(e) => setNovaDespesaPreco(e.target.value)}
                        />
                        <button type="submit">Adicionar</button>
                    </form>

                    <h3>Total: R$ {calcularTotal().toFixed(2)}</h3>

                    {despesas.length === 0 ? (
                        <p className="sem-despesas">
                            Nenhuma despesa encontrada.
                        </p>
                    ) : (
                        <ul className="lista-despesas">
                            {despesas.map(d => (
                                <li key={d.id} className="despesa-item">
                                    <span>{d.nome} — R$ {d.preco.toFixed(2)}</span>
                                    <button
                                        onClick={() => handleExcluirDespesa(d.id)}
                                        style={{ marginLeft: "1rem", cursor: "pointer" }}
                                        title="Excluir item"
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default Despesas;
