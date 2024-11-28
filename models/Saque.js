const connection = require("../config/database");

class Saque {
  constructor(id, dataSaque, plataforma, intermediador, banco, valor, prazo) {
    this.id = id;
    this.dataSaque = dataSaque;
    this.plataforma = plataforma;
    this.intermediador = intermediador;
    this.banco = banco;
    this.valor = valor;
    this.prazo = prazo;
  }

  // Método estático para buscar todos os saques
  static findAll(callback) {
    const query = `
      SELECT 
        id, dataSaque, plataforma, intermediador, banco, valor, prazo
      FROM 
        Saque;
    `;

    connection.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.map(row => new Saque(
        row.id, 
        row.dataSaque, 
        row.plataforma, 
        row.intermediador, 
        row.banco, 
        row.valor, 
        row.prazo
      )));
    });
  }

  // Método estático para buscar por ID
  static findById(id, callback) {
    const query = `
      SELECT 
        id, dataSaque, plataforma, intermediador, banco, valor, prazo
      FROM 
        Saque
      WHERE 
        id = ?;
    `;

    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      const row = results[0];
      callback(null, new Saque(row.id, row.dataSaque, row.plataforma, row.intermediador, row.banco, row.valor, row.prazo));
    });
  }

  // Método estático para criar um novo saque
  static create(data, callback) {
    const query = `
      INSERT INTO Saque (dataSaque, plataforma, intermediador, banco, valor, prazo) 
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    connection.query(query, [
      data.dataSaque, 
      data.plataforma, 
      data.intermediador, 
      data.banco, 
      data.valor, 
      data.prazo
    ], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.insertId);
    });
  }

  // Método estático para atualizar um saque existente
  static update(id, data, callback) {
    const query = `
      UPDATE Saque 
      SET dataSaque = ?, plataforma = ?, intermediador = ?, banco = ?, valor = ?, prazo = ? 
      WHERE id = ?;
    `;

    connection.query(query, [
      data.dataSaque, 
      data.plataforma, 
      data.intermediador, 
      data.banco, 
      data.valor, 
      data.prazo, 
      id
    ], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.affectedRows > 0);
    });
  }

  // Método estático para deletar um saque
  static delete(id, callback) {
    const query = `
      DELETE FROM Saque 
      WHERE id = ?;
    `;

    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.affectedRows > 0);
    });
  }
}

module.exports = Saque;
