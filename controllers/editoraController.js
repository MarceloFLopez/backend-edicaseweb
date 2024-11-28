// Importa o módulo de conexão com o banco de dados
const db = require('../config/database');

// Função para criar uma nova autor
exports.create = (req, res) => {
  const { nome } = req.body; // Pega o nome da autor a partir do corpo da requisição
  const sql = 'INSERT INTO Editora (nome) VALUES (?)';

  db.query(sql, [nome], (err, result) => {
    if (err) {
      console.error('Erro ao inserir editora:', err.message);
      return res.status(500).json({ error: 'Erro ao inserir editor' });
    }
    res.status(201).json({ message: 'editora criado com sucesso!' });
  });
};
// Função para criar uma nova editora

// Função para listar todas as editora
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM Editora';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar editoras:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar editoras' });
    }
    res.json(results);
  });
};
// Função para listar todas as editoras

// Função para atualizar uma Editora
exports.update = (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const sql = 'UPDATE Editora SET nome = ? WHERE id = ?';
  db.query(sql, [nome, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar editora:', err.message);
      return res.status(500).json({ error: 'Erro ao atualizar editora' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Editora não encontrado' });
    }
    res.json({ message: 'Editora atualizado com sucesso' });
  });
};
// Função para atualizar uma Editora

// Função para excluir uma Editora
exports.delete = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM Editora WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir editora:', err.message);
      return res.status(500).json({ error: 'Erro ao excluir editor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Editora não encontrada' });
    }
    res.json({ message: 'Editora excluída com sucesso' });
  });
};
// Função para excluir um Editora

// Função para buscar uma Editora pelo ID
exports.getById = (req, res) => {
  const { id } = req.params;

  // Verifica se o ID é um número válido
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Id Inválido' });
  }

  const sql = 'SELECT * FROM Editora WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar editora:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar editora' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Editora não encontrado' });
    }
    res.json(result[0]); // Retorna a Editora encontrada
  });
};
// Função para buscar uma Editora pelo ID

// Função para buscar Editora pela string fornecida
exports.getByString = (req, res) => {
  const { searchString } = req.params; // Recebe a string que será utilizada na busca

  // Verifica se a string de pesquisa está vazia
  if (!searchString || searchString.trim() === '') {
    return res.status(400).json({ error: 'String de busca não pode ser vazia' });
  }

  // Consulta para buscar Editora que contenham a string no nome ou descrição (ajuste conforme necessário)
  const sql = 'SELECT * FROM Editora WHERE nome LIKE ? OR nome LIKE ?';
  const searchPattern = `%${searchString}%`; // Adiciona % para realizar uma busca com LIKE no banco de dados
  
  db.query(sql, [searchPattern, searchPattern], (err, result) => {
    if (err) {
      console.error('Erro ao buscar editoras:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar editoras' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Nenhuma editora encontrada' });
    }
    res.json(result); // Retorna as editoras encontradas
  });
};
// Função para buscar editoras pela string fornecida
