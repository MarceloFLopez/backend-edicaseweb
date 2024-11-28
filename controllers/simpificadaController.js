const connection = require("../config/database");

const simplificadaController = {
  // Método para listar todas as revistas simplificadas
  getAll: (req, res) => {
    const query = `
      SELECT 
        s.id,
        s.titulo,
        s.periodicidade,
        s.tipo,
        s.status,
        s.valorComercial,
        s.dataEntrega,
        s.dataProgramacao,
        s.refProgramacao,
        cl.nome,
        c.nome,
        r.titulo
      FROM 
        Simplificada s
      LEFT JOIN 
        Cliente cl ON s.clienteId = cl.id
      LEFT JOIN 
        Categoria c ON s.categoriaId = c.id
      LEFT JOIN 
        Revista r ON s.revistaId = r.id;
    `;

    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar simplificadas: " + err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Nenhuma revista simplificada encontrada." });
      }
      res.status(200).json(results);
    });
  },

  // Método para buscar uma revista simplificada por ID
  getById: (req, res) => {
    const { id } = req.params;
    const query = `
      SELECT 
        s.id,
        s.titulo,
        s.periodicidade,
        s.tipo,
        s.status,
        s.valorComercial,
        s.dataEntrega,
        s.dataProgramacao,
        s.refProgramacao,
        cl.nome AS clienteNome,
        c.nome AS categoriaNome,
        r.titulo AS revistaNome
      FROM 
        Simplificada s
      LEFT JOIN 
        Cliente cl ON s.clienteId = cl.id
      LEFT JOIN 
        Categoria c ON s.categoriaId = c.id
      LEFT JOIN 
        Revista r ON s.revistaId = r.id
      WHERE 
        s.id = ?;
    `;
    connection.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar revista simplificada: " + err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Revista simplificada não encontrada." });
      }
      res.status(200).json(results[0]);
    });
  },


  // Método para criar uma nova revista simplificada
  create: (req, res) => {
    const {
      titulo,
      periodicidade,
      tipo,
      status,
      valorComercial,
      dataEntrega,
      dataProgramacao,
      refProgramacao,
      clienteId,
      categoriaId,
      revistaId
    } = req.body;

    const query = `
      INSERT INTO Simplificada (
        titulo, periodicidade, tipo, status, valorComercial, 
        dataEntrega, dataProgramacao, refProgramacao, clienteId, categoriaId, revistaId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      titulo,
      periodicidade,
      tipo,
      status,
      valorComercial,
      dataEntrega,
      dataProgramacao,
      refProgramacao,
      clienteId,
      categoriaId,
      revistaId
    ];

    connection.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao criar revista simplificada: " + err.message });
      }
      res.status(201).json({ message: "Revista simplificada criada com sucesso", id: results.insertId });
    });
  },

  // Método para atualizar uma revista simplificada
  update: (req, res) => {
    const { id } = req.params;
    const {
      titulo,
      periodicidade,
      tipo,
      status,
      valorComercial,
      dataEntrega,
      dataProgramacao,
      refProgramacao,
      clienteId,
      categoriaId,
      revistaId
    } = req.body;

    const query = `
      UPDATE Simplificada SET 
        titulo = ?, 
        periodicidade = ?, 
        tipo = ?, 
        status = ?, 
        valorComercial = ?, 
        dataEntrega = ?, 
        dataProgramacao = ?, 
        refProgramacao = ?, 
        clienteId = ?, 
        categoriaId = ?, 
        revistaId = ?
      WHERE id = ?;
    `;

    const values = [
      titulo,
      periodicidade,
      tipo,
      status,
      valorComercial,
      dataEntrega,
      dataProgramacao,
      refProgramacao,
      clienteId,
      categoriaId,
      revistaId
    ];

    connection.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao atualizar revista simplificada: " + err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Revista simplificada não encontrada." });
      }
      res.json({ message: "Revista simplificada atualizada com sucesso." });
    });
  },

  // Método para deletar uma revista simplificada por ID
  delete: (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Simplificada WHERE id = ?;`;

    connection.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao deletar revista simplificada: " + err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Revista simplificada não encontrada." });
      }
      res.json({ message: "Revista simplificada deletada com sucesso." });
    });
  },

  // Método para buscar revistas simplificadas por string no título ou descrição
  getByString: (req, res) => {
    const { searchString } = req.params;

    if (!searchString || searchString.trim() === "") {
      return res.status(400).json({ error: "String de busca não pode ser vazia." });
    }

    const query = `
      SELECT 
        s.*,
        r.nome AS revistaNome,
        c.nome AS categoriaNome,
        cl.nome AS clienteNome
      FROM 
        Simplificada s
      LEFT JOIN 
        Cliente cl ON s.clienteId = cl.id
      LEFT JOIN 
        Categoria c ON s.categoriaId = c.id
      LEFT JOIN 
        Revista r ON s.revistaId = r.id
      WHERE 
        s.titulo LIKE ? OR s.tipo LIKE ?;
    `;

    const searchPattern = `%${searchString}%`;

    connection.query(query, [searchPattern, searchPattern], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar revistas simplificadas: " + err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Nenhuma revista simplificada encontrada." });
      }
      res.status(200).json(results);
    });
  }
};

module.exports = simplificadaController;
