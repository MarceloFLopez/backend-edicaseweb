// Importa o módulo de conexão com o banco de dados
const db = require('../config/database');

// Função para criar uma nova categoria
exports.create = (req, res) => {
  const { nome } = req.body; // Pega o nome da categoria a partir do corpo da requisição
  const sql = 'INSERT INTO Categoria (nome) VALUES (?)';

  db.query(sql, [nome], (err, result) => {
    if (err) {
      console.error('Erro ao inserir categoria:', err.message);
      return res.status(500).json({ error: 'Erro ao inserir categoria' });
    }
    res.status(201).json({ message: 'Categoria criada com sucesso!' });
  });
};
// Função para criar uma nova categoria

// Função para listar todas as categorias
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM Categoria';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar categorias:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
    res.json(results);
  });
};
// Função para listar todas as categorias

// Função para atualizar uma categoria
exports.update = (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const sql = 'UPDATE Categoria SET nome = ? WHERE id = ?';
  db.query(sql, [nome, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar categoria:', err.message);
      return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.json({ message: 'Categoria atualizada com sucesso' });
  });
};
// Função para atualizar uma categoria

// Função para excluir uma categoria
exports.delete = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM Categoria WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir categoria:', err.message);
      return res.status(500).json({ error: 'Erro ao excluir categoria' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.json({ message: 'Categoria excluída com sucesso' });
  });
};
// Função para excluir uma categoria

// Função para buscar uma categoria pelo ID
exports.getById = (req, res) => {
  const { id } = req.params;

  // Verifica se o ID é um número válido
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Id Inválido' });
  }

  const sql = 'SELECT * FROM Categoria WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar categoria:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.json(result[0]); // Retorna a categoria encontrada
  });
};
// Função para buscar uma categoria pelo ID

// Função para buscar categorias pela string fornecida
exports.getByString = (req, res) => {
  const { searchString } = req.params; // Recebe a string que será utilizada na busca

  // Verifica se a string de pesquisa está vazia
  if (!searchString || searchString.trim() === '') {
    return res.status(400).json({ error: 'String de busca não pode ser vazia' });
  }

  // Consulta para buscar categorias que contenham a string no nome ou descrição (ajuste conforme necessário)
  const sql = 'SELECT * FROM Categoria WHERE nome LIKE ? OR nome LIKE ?';
  const searchPattern = `%${searchString}%`; // Adiciona % para realizar uma busca com LIKE no banco de dados
  
  db.query(sql, [searchPattern, searchPattern], (err, result) => {
    if (err) {
      console.error('Erro ao buscar categorias:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Nenhuma categoria encontrada' });
    }
    res.json(result); // Retorna as categorias encontradas
  });
};
// Função para buscar categorias pela string fornecida
