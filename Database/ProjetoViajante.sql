DROP DATABASE IF EXISTS ProjetoViajante;

CREATE DATABASE ProjetoViajante;

USE ProjetoViajante;


CREATE TABLE Usuario (
  idUser INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nomeUser VARCHAR(255),
  emailUser VARCHAR(255),
  senhaUser VARCHAR(255),
  dataCadastroUser DATE,
  dataExclusaoUser DATE
  );


CREATE TABLE Viagem (
  idViagem INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tituloViagem VARCHAR(255),
  idUser INT, FOREIGN KEY (idUser) REFERENCES Usuario (idUser)
  );


CREATE TABLE Mochila (
  idMochila INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tituloMochila VARCHAR(255),
  idViagem INT, FOREIGN KEY (idViagem) REFERENCES Viagem (idViagem),
  idUser INT, FOREIGN KEY (idUser) REFERENCES Viagem (idUser)
);


CREATE TABLE MochilaItem (
  idMochilaItem INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nomeMochilaItem VARCHAR(255),
  quantMochilaItem VARCHAR(255),
  idMochila INT, FOREIGN KEY (idMochila) REFERENCES Mochila (idMochila),
  idViagem INT, FOREIGN KEY (idViagem) REFERENCES Mochila (idViagem),
  idUser INT, FOREIGN KEY (idUser) REFERENCES Mochila (idUser)
);


CREATE TABLE Despesa (
  idDespesa INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tituloDespesa VARCHAR(255),
  idViagem INT, FOREIGN KEY (idViagem) REFERENCES Viagem (idViagem),
  idUser INT, FOREIGN KEY (idUser) REFERENCES Viagem (idUser)
);


CREATE TABLE DespesaItem (
  idDespesaItem INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nomeDespesaItem VARCHAR(255),
  precoDespesaItem INT,
  idDespesa INT, FOREIGN KEY (idDespesa) REFERENCES Despesa (idDespesa),
  idViagem INT, FOREIGN KEY (idViagem) REFERENCES Despesa (idViagem),
  idUser INT, FOREIGN KEY (idUser) REFERENCES Despesa (idUser)
);


CREATE TABLE Agenda (
  idAgenda INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  dataPartidaAgenda DATE,
  dataChegadaAgenda DATE,
  idViagem INT, FOREIGN KEY (idViagem) REFERENCES Viagem (idViagem),
  idUser INT, FOREIGN KEY (idUser) REFERENCES Viagem (idUser)
);

select * from Usuario;
select * from Viagem;
select * from Mochila;
select * from MochilaItem;
select * from Despesa;
select * from DespesaItem;
select * from Agenda;
