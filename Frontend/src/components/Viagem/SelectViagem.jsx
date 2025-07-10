import React from "react";

const SelectViagem = ({ viagens, viagemSelecionadaId, setViagemSelecionadaId }) => {
    return (
        <div className="form-viagem" style={{ marginBottom: "2rem" }}>
            <label htmlFor="select-viagem" style={{ flex: "1 1 100%" }}>
                Selecione a viagem:
                <select
                    id="select-viagem"
                    value={viagemSelecionadaId}
                    onChange={(e) => setViagemSelecionadaId(e.target.value)}
                    style={{
                        marginTop: "0.5rem",
                        width: "100%",
                        padding: "0.5rem",
                        fontSize: "1rem",
                        borderRadius: "var(--border-radius)",
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="">-- Escolha a viagem --</option>
                    {viagens.map((v) => (
                        <option key={v.id} value={v.id}>
                            {v.titulo}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default SelectViagem;
