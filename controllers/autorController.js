// Importa o módulo de conexão com o banco de dados
const db = require('../config/database');


// Função para listar todas as autor
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM Autor';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar autores:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar autores' });
    }
    res.json(results);
  });
};
// Função para listar todas as autores

// Função para criar uma nova autor
exports.create = (req, res) => {
  const { nome } = req.body; // Pega o nome da autor a partir do corpo da requisição
  const sql = 'INSERT INTO Autor (nome) VALUES (?)';

  db.query(sql, [nome], (err, result) => {
    if (err) {
      console.error('Erro ao inserir autor:', err.message);
      return res.status(500).json({ error: 'Erro ao inserir autor' });
    }
    res.status(201).json({ message: 'autor criado com sucesso!' });
  });
};


// Função para atualizar uma autor
exports.update = (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const sql = 'UPDATE Autor SET nome = ? WHERE id = ?';
  db.query(sql, [nome, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar autor:', err.message);
      return res.status(500).json({ error: 'Erro ao atualizar autor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Autor não encontrado' });
    }
    res.json({ message: 'Autor atualizado com sucesso' });
  });
};
// Função para atualizar uma autor

// Função para excluir uma autor
exports.delete = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM Autor WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir autor:', err.message);
      return res.status(500).json({ error: 'Erro ao excluir autor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Autor não encontrada' });
    }
    res.json({ message: 'Autor excluída com sucesso' });
  });
};
// Função para excluir um autor

// Função para buscar uma Autor pelo ID
exports.getById = (req, res) => {
  const { id } = req.params;

  // Verifica se o ID é um número válido
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Id Inválido' });
  }

  const sql = 'SELECT * FROM Autor WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar autor:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar autor' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Autor não encontrado' });
    }
    res.json(result[0]); // Retorna a autor encontrada
  });
};
// Função para buscar uma autor pelo ID

// Função para buscar autores pela string fornecida
exports.getByString = (req, res) => {
  const { searchString } = req.params; // Recebe a string que será utilizada na busca

  // Verifica se a string de pesquisa está vazia
  if (!searchString || searchString.trim() === '') {
    return res.status(400).json({ error: 'String de busca não pode ser vazia' });
  }

  // Consulta para buscar Autor que contenham a string no nome ou descrição (ajuste conforme necessário)
  const sql = 'SELECT * FROM Autor WHERE nome LIKE ? OR nome LIKE ?';
  const searchPattern = `%${searchString}%`; // Adiciona % para realizar uma busca com LIKE no banco de dados
  
  db.query(sql, [searchPattern, searchPattern], (err, result) => {
    if (err) {
      console.error('Erro ao buscar autores:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar autores' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Nenhuma autor encontrada' });
    }
    res.json(result); // Retorna as autores encontradas
  });
};
// Função para buscar autores pela string fornecida


