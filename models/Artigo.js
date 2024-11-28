const connection = require('../config/database'); // Substitua pelo caminho correto da sua configuração de banco de dados

class Artigo {
constructor(id, nome, data, ativo, categoriaId) {
    this.id = id;
    this.nome = nome;
    this.data = data;
    this.ativo = ativo;
    this.categoriaId = categoriaId;
  }
}

// class Artigo {
//   static getAll(callback) {
//     const query = 'SELECT * FROM Artigo';
//     connection.query(query, callback);
//   }

//   static getById(id, callback) {
//     const query = 'SELECT * FROM Artigo WHERE id = ?';
//     connection.query(query, [id], callback);
//   }

//   static create({ nome, data, ativo, categoriaId }, callback) {
//     const query = 'INSERT INTO Artigo (nome, data, ativo, categoriaId) VALUES (?, ?, ?, ?)';
//     connection.query(query, [nome, data, ativo, categoriaId], callback);
//   }

//   static update(id, { nome, data, ativo, categoriaId }, callback) {
//     const query = 'UPDATE Artigo SET nome = ?, data = ?, ativo = ?, categoriaId = ? WHERE id = ?';
//     connection.query(query, [nome, data, ativo, categoriaId, id], callback);
//   }

//   static delete(id, callback) {
//     const query = 'DELETE FROM Artigo WHERE id = ?';
//     connection.query(query, [id], callback);
//   }
// }

// module.exports = Artigo;
