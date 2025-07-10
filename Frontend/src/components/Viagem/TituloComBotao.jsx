import React from "react";

const TituloComBotao = ({ titulo, onBotaoClick, mostrarBotao = true }) => {
  return (
    <div className="titulo_e_mais" style={{ marginBottom: "1rem" }}>
      <h2 className="titulo-principal">{titulo}</h2>
      {mostrarBotao && (
        <button className="btn-nova-viagem" onClick={onBotaoClick}>
          +
        </button>
      )}
    </div>
  );
};

export default TituloComBotao;
