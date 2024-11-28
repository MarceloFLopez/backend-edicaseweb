// Importa o módulo de conexão com o banco de dados
const db = require('../config/database');

// Função para criar uma nova banca
exports.create = (req, res) => {
  const { nome,
    ativacaoTitulos, 
    formatoPdf, 
    format, 
    prazoMedio, 
    site, 
    comoAcessar, 
    pagamentosForm, 
    beneficios, 
    mediAssinantes, 
    situacao 
   } = req.body; // Pega o nome da banca a partir do corpo da requisição

   // Verifique se os campos obrigatórios estão presentes
  if (!nome || !ativacaoTitulos || !formatoPdf || !format || !prazoMedio || !site || !situacao) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
  }

  
   // A consulta SQL com todos os campos
   const sql = `
   INSERT INTO Banca (
     nome, ativacaoTitulos, formatoPdf, format, prazoMedio, site, 
     comoAcessar, pagamentosForm, beneficios, mediAssinantes, situacao
   ) 
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
 `;

   // Executando a consulta com todos os valores
   db.query(
    sql, 
    [
      nome, 
      ativacaoTitulos, 
      formatoPdf, 
      format, 
      prazoMedio, 
      site, 
      comoAcessar, 
      pagamentosForm, 
      beneficios, 
      mediAssinantes, 
      situacao
    ], 
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir uma banca:', err.message);
        return res.status(500).json({ error: 'Erro ao inserir banca' });
      }

      res.status(201).json({ message: 'Banca criada com sucesso!' });
    }
  );
};
// Função para criar uma nova banca

// Função para listar todas as banca
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM Banca';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar bancas:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar bancas..' });
    }
    res.json(results);
  });
};
// Função para listar todas as autores

// Função para atualizar uma autor
exports.update = (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const sql = 'UPDATE Banca SET nome = ? WHERE id = ?';
  db.query(sql, [nome, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar banca:', err.message);
      return res.status(500).json({ error: 'Erro ao atualizar banca' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Banca não encontrado' });
    }
    res.json({ message: 'Banca atualizado com sucesso' });
  });
};
// Função para atualizar uma banca

// Função para excluir uma banca
exports.delete = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM Banca WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir banca:', err.message);
      return res.status(500).json({ error: 'Erro ao excluir banca' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'banca não encontrada' });
    }
    res.json({ message: 'banca excluída com sucesso' });
  });
};
// Função para excluir um banca

// Função para buscar uma banca pelo ID
exports.getById = (req, res) => {
  const { id } = req.params;

  // Verifica se o ID é um número válido
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Id Inválido' });
  }

  const sql = 'SELECT * FROM Banca WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar banca:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar banca' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Banca não encontrado' });
    }
    res.json(result[0]); // Retorna a banca encontrada
  });
};
// Função para buscar uma banca pelo ID

// Função para buscar bancas pela string fornecida
exports.getByString = (req, res) => {
  const { searchString } = req.params; // Recebe a string que será utilizada na busca

  // Verifica se a string de pesquisa está vazia
  if (!searchString || searchString.trim() === '') {
    return res.status(400).json({ error: 'String de busca não pode ser vazia' });
  }

  // Consulta para buscar banca que contenham a string no nome ou descrição (ajuste conforme necessário)
  const sql = 'SELECT * FROM Banca WHERE nome LIKE ?  ORDER BY id DESC';
  const searchPattern = `%${searchString}%`; // Adiciona % para realizar uma busca com LIKE no banco de dados
  
  db.query(sql, [searchPattern, searchPattern], (err, result) => {
    if (err) {
      console.error('Erro ao buscar bancas:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar bancas' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Nenhuma bancas encontradas' });
    }
    res.json(result); // Retorna as autores encontradas
  });
};
// Função para buscar autores pela string fornecida
