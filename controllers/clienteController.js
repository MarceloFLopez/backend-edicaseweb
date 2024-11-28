// Importa o módulo de conexão com o banco de dados
const db = require('../config/database');

// Função para criar uma nova autor
exports.create = (req, res) => {
  const { nome } = req.body; // Pega o nome da cliente a partir do corpo da requisição
  const sql = 'INSERT INTO Cliente (nome) VALUES (?)';

  db.query(sql, [nome], (err, result) => {
    if (err) {
      console.error('Erro ao inserir cliente:', err.message);
      return res.status(500).json({ error: 'Erro ao inserir cliente' });
    }
    res.status(201).json({ message: 'cliente criado com sucesso!' });
  });
};
// Função para criar uma nova cliente

// Função para listar todas as cliente
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM Cliente';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
    res.json(results);
  });
};
// Função para listar todas as clientes

// Função para atualizar uma cliente
exports.update = (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const sql = 'UPDATE Cliente SET nome = ? WHERE id = ?';
  db.query(sql, [nome, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar cliente:', err.message);
      return res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json({ message: 'Cliente atualizado com sucesso' });
  });
};
// Função para atualizar uma cliente

// Função para excluir um cliente
exports.delete = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM Cliente WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir cliente:', err.message);
      return res.status(500).json({ error: 'Erro ao excluir cliente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente não encontrada' });
    }
    res.json({ message: 'Cliente excluída com sucesso' });
  });
};
// Função para excluir um cliente

// Função para buscar um cliente pelo ID
exports.getById = (req, res) => {
  const { id } = req.params;

  // Verifica se o ID é um número válido
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Id Inválido' });
  }

  const sql = 'SELECT * FROM Cliente WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar cliente:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'cliente não encontrado' });
    }
    res.json(result[0]); // Retorna a cliente encontrada
  });
};
// Função para buscar uma cliente pelo ID

// Função para buscar clientes pela string fornecida
exports.getByString = (req, res) => {
  const { searchString } = req.params; // Recebe a string que será utilizada na busca

  // Verifica se a string de pesquisa está vazia
  if (!searchString || searchString.trim() === '') {
    return res.status(400).json({ error: 'String de busca não pode ser vazia' });
  }

  // Consulta para buscar cliente que contenham a string no nome ou descrição (ajuste conforme necessário)
  const sql = 'SELECT * FROM Cliente WHERE nome LIKE ? OR nome LIKE ?';
  const searchPattern = `%${searchString}%`; // Adiciona % para realizar uma busca com LIKE no banco de dados
  
  db.query(sql, [searchPattern, searchPattern], (err, result) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Nenhuma cliente encontrada' });
    }
    res.json(result); // Retorna os clientes encontrados
  });
};
// Função para buscar clientes pela string fornecida
