DROP DATABASE IF EXISTS ProjetoViajante;

CREATE DATABASE ProjetoViajante;

USE ProjetoViajante;


CREATE TABLE Usuario (
  idUser INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  
  user_nome VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_senha VARCHAR(16) NOT NULL
  );
  
  
  CREATE TABLE Viagem (
  idViagem INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  
  viagem_titulo VARCHAR(100) NOT NULL,
  viagem_dataPartida DATE,
  viagem_dataChegada DATE,
  
  idUser INT, FOREIGN KEY (idUser) REFERENCES Usuario (idUser) ON DELETE CASCADE ON UPDATE CASCADE
  );
  
  
  CREATE TABLE Lugar (
	idLocal INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    
    lugar_cep INT,
    lugar_rua VARCHAR(100),
    lugar_bairro VARCHAR(100),
    lugar_numero INT,
    lugar_complemento VARCHAR(100),
    lugar_cidade VARCHAR(100),
    lugar_estado VARCHAR(100),
    lugar_pais VARCHAR(100),
    
    idViagem INT, FOREIGN KEY (idViagem) REFERENCES Viagem (idViagem) ON DELETE CASCADE ON UPDATE CASCADE,
    idUser INT, FOREIGN KEY (idUser) REFERENCES Viagem (idUser) ON DELETE CASCADE ON UPDATE CASCADE
  );


CREATE TABLE Mochila (
  idMochila INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  
  mochila_titulo VARCHAR(100) NOT NULL,
   mochila_pesoTotalAprox INT,
  
  idViagem INT, FOREIGN KEY (idViagem) REFERENCES Viagem (idViagem) ON DELETE CASCADE ON UPDATE CASCADE,
  idUser INT, FOREIGN KEY (idUser) REFERENCES Viagem (idUser) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE MochilaItem (
  idMochilaItem INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  
  mochilaItem_nome VARCHAR(100),
  mochilaItem_quant INT NOT NULL,
  mochilaItem_descricao VARCHAR(500),
  
  idMochila INT, FOREIGN KEY (idMochila) REFERENCES Mochila (idMochila) ON DELETE CASCADE ON UPDATE CASCADE,
  idViagem INT, FOREIGN KEY (idViagem) REFERENCES Mochila (idViagem) ON DELETE CASCADE ON UPDATE CASCADE,
  idUser INT, FOREIGN KEY (idUser) REFERENCES Mochila (idUser) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Despesa (
  idDespesa INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  
  despesa_titulo VARCHAR(100) NOT NULL,
  despesa_valorTotal INT,
  
  idViagem INT, FOREIGN KEY (idViagem) REFERENCES Viagem (idViagem) ON DELETE CASCADE ON UPDATE CASCADE,
  idUser INT, FOREIGN KEY (idUser) REFERENCES Viagem (idUser) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE DespesaItem (
  idDespesaItem INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  
  despesaItem_nome VARCHAR(100) NOT NULL,
  despesaItem_valor INT,
  despesaItem_descricao VARCHAR(500),
  
  idDespesa INT, FOREIGN KEY (idDespesa) REFERENCES Despesa (idDespesa) ON DELETE CASCADE ON UPDATE CASCADE,
  idViagem INT, FOREIGN KEY (idViagem) REFERENCES Despesa (idViagem) ON DELETE CASCADE ON UPDATE CASCADE,
  idUser INT, FOREIGN KEY (idUser) REFERENCES Despesa (idUser) ON DELETE CASCADE ON UPDATE CASCADE
);

/*
select * from Usuario;
select * from Viagem;
select * from Lugar;
select * from Mochila;
select * from MochilaItem;
select * from Despesa;
select * from DespesaItem;
*/

/*
  insert into Usuario (user_nome, user_email, user_senha) values ('teste', 'teste@gmail.com', 'ssssssss');
  select * from Usuario;
  
  insert into Viagem (viagem_titulo, viagem_dataPartida, viagem_dataChegada, idUser) values ('viajinha', '2025-11-08', '2025-12-25', 1);
  select * from Viagem;
  
  update Usuario set idUser = 2 where idUser = 1;
  /*