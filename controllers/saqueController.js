const connection = require('../config/database'); // Substitua pelo caminho correto para seu arquivo de conexão

module.exports = {
  getAll: (req, res) => {
    const query = `
      SELECT 
        id, dataSaque, plataforma, intermediador, banco, valor, prazo
      FROM 
        Saque;
    `;

    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(200).json(results);
    });
  },

  getById: (req, res) => {
    const { id } = req.params;

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
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Saque não encontrado.' });
      }

      res.status(200).json(results[0]);
    });
  },

  create: (req, res) => {
    const { dataSaque, plataforma, intermediador, banco, valor, prazo } = req.body;
    const query = `
      INSERT INTO Saque 
      (dataSaque, plataforma, intermediador, banco, valor, prazo) 
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    connection.query(query, [dataSaque, plataforma, intermediador, banco, valor, prazo], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao registrar um novo saque!' });
      }
      res.status(201).json({ message: 'Saque registrado com sucesso', id: results.insertId });
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { dataSaque, plataforma, intermediador, banco, valor, prazo } = req.body;
    const query = `
      UPDATE Saque 
      SET 
        dataSaque = ?, plataforma = ?, intermediador = ?, banco = ?, valor = ?, prazo = ? 
      WHERE 
        id = ?;
    `;

    connection.query(query, [dataSaque, plataforma, intermediador, banco, valor, prazo, id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Saque não encontrado para atualização.' });
      }

      res.json({ message: 'Saque atualizado com sucesso' });
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    const query = `
      DELETE FROM Saque 
      WHERE id = ?;
    `;

    connection.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Saque não encontrado para exclusão.' });
      }

      res.json({ message: 'Saque excluído com sucesso' });
    });
  },
};
