const connection = require('../config/database'); // Substitua pelo caminho correto para seu arquivo de conexão

module.exports = {
  getaAll: (req, res) => {
    const query = `
    SELECT 
      a.id AS artigoId,
      a.nome AS artigoNome,
      a.data,
      a.ativo,
      c.id AS categoriaId,
      c.nome AS categoriaNome
    FROM 
      Artigo a
    LEFT JOIN 
      Categoria c ON a.categoriaId = c.id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Formata o resultado para incluir a categoria dentro do artigo
    const artigos = results.map(row => ({
      id: row.artigoId,
      nome: row.artigoNome,
      data: row.data,
      ativo: row.ativo,
      categoria: {
        id: row.categoriaId,
        nome: row.categoriaNome,
      },
    }));

    res.json(artigos);
  });
  },

  getById: (req, res) => {
    const { id } = req.params;

  const query = `
    SELECT 
      a.id AS artigoId,
      a.nome AS artigoNome,
      a.data,
      a.ativo,
      c.id AS categoriaId,
      c.nome AS categoriaNome
    FROM 
      Artigo a
    LEFT JOIN 
      Categoria c ON a.categoriaId = c.id
    WHERE 
      a.id = ?
  `;

  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Artigo não encontrado.' });
    }

    // Formata o resultado para incluir a categoria dentro do artigo
    const artigo = {
      id: results[0].artigoId,
      nome: results[0].artigoNome,
      data: results[0].data,
      ativo: results[0].ativo,
      categoria: {
        id: results[0].categoriaId,
        nome: results[0].categoriaNome,
      },
    };

    res.json(artigo);
  });
  },

  create: (req, res) => {
    const { nome, data, ativo, categoriaId } = req.body;
    const query = 'INSERT INTO Artigo (nome, data, ativo, categoriaId) VALUES (?, ?, ?, ?)';
    connection.query(query, [nome, data, ativo, categoriaId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criar um novo Artigo id da Categoria inválido!' });
      }
      res.status(201).json({ message: 'Artigo criado com sucesso', id: results.insertId });
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { nome, data, ativo, categoriaId } = req.body;
    const query = 'UPDATE Artigo SET nome = ?, data = ?, ativo = ?, categoriaId = ? WHERE id = ?';
    connection.query(query, [nome, data, ativo, categoriaId, id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Artigo atualizado com sucesso' });
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Artigo WHERE id = ?';
    
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Verifica se algum registro foi afetado
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Artigo não encontrado.' });
        }

        res.json({ message: 'Artigo excluído com sucesso.' });
    });
},

};
