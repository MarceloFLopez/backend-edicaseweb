const connection = require("../config/database");

const revistaController = {
  getAll: (req, res) => {
    const query = `
      SELECT 
        r.id,
        r.titulo,
        r.dataPdf,
        r.prazoEntrega,
        r.edicao,
        r.chamadaPrincipal,
        r.palavraChave,
        r.numeroPaginas,
        r.codigoBarras,
        r.ean,
        r.bisac,
        r.descricaoBasica,
        r.periodicidade,
        r.precoCapa,
        r.arquivoAberto,
        r.observacao,
        a.id AS autorNome,
        c.id AS categoriaNome,
        e.id AS editoraNome
      FROM 
        Revista r
      left JOIN 
        Autor a ON r.autorId = a.id
      left JOIN 
        Categoria c ON r.categoriaId = c.id
      left JOIN 
        Editora e ON r.editoraId = e.id;
    `;
  
    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar revistas: ' + err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Nenhuma revista encontrada.' });
      }
      res.status(200).json(results);
    });
  },
  

  getById: (req, res) => {
    const { id } = req.params;
    const query = `
      SELECT 
        r.id, r.titulo, r.dataPdf, r.prazoEntrega, r.edicao, 
        r.chamadaPrincipal, r.palavraChave, r.numeroPaginas, 
        r.codigoBarras, r.ean, r.bisac, r.descricaoBasica, 
        r.periodicidade, r.precoCapa, r.arquivoAberto, r.observacao,
        a.nome AS autorNome, 
        r.autorId,
        c.nome AS categoriaNome, 
        r.categoriaId,
        e.nome AS editoraNome,
        r.editoraId
      FROM Revista r
      LEFT JOIN Autor a ON r.autorId = a.id
      LEFT JOIN Categoria c ON r.categoriaId = c.id
      LEFT JOIN Editora e ON r.editoraId = e.id
      WHERE r.id = ?;
    `;
    connection.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Revista não encontrada" });
      }
      res.json(results[0]);
    });
  },

  create: (req, res) => {
    const {
      titulo, dataPdf, prazoEntrega, edicao, chamadaPrincipal, palavraChave,
      autorId, numeroPaginas, codigoBarras, ean, bisac, descricaoBasica,
      categoriaId, editoraId, periodicidade, precoCapa, arquivoAberto, observacao
    } = req.body;

    const query = `
      INSERT INTO Revista (
        titulo, dataPdf, prazoEntrega, edicao, chamadaPrincipal, palavraChave, 
        autorId, numeroPaginas, codigoBarras, ean, bisac, descricaoBasica, 
        categoriaId, editoraId, periodicidade, precoCapa, arquivoAberto, observacao
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const values = [
      titulo, dataPdf, prazoEntrega, edicao, chamadaPrincipal, palavraChave,
      autorId, numeroPaginas, codigoBarras, ean, bisac, descricaoBasica,
      categoriaId, editoraId, periodicidade, precoCapa, arquivoAberto, observacao
    ];

    connection.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Revista criada com sucesso", id: results.insertId });
    });
  },

  // update: (req, res) => {
  //   const { id } = req.params;
  //   const {
  //     titulo, dataPdf, prazoEntrega, edicao, chamadaPrincipal, palavraChave,
  //     autorId, numeroPaginas, codigoBarras, ean, bisac, descricaoBasica,
  //     categoriaId, editoraId, periodicidade, precoCapa, arquivoAberto, observacao
  //   } = req.body;

  //   const query = `
  //     UPDATE Revista SET 
  //       titulo = ?, dataPdf = ?, prazoEntrega = ?, edicao = ?, chamadaPrincipal = ?, palavraChave = ?, 
  //       autorId = ?, numeroPaginas = ?, codigoBarras = ?, ean = ?, bisac = ?, descricaoBasica = ?, 
  //       categoriaId = ?, editoraId = ?, periodicidade = ?, precoCapa = ?, arquivoAberto = ?, observacao = ?
  //     WHERE id = ?;
  //   `;
  //   const values = [
  //     titulo, dataPdf, prazoEntrega, edicao, chamadaPrincipal, palavraChave,
  //     autorId, numeroPaginas, codigoBarras, ean, bisac, descricaoBasica,
  //     categoriaId, editoraId, periodicidade, precoCapa, arquivoAberto, observacao, id
  //   ];

  //   connection.query(query, values, (err, results) => {
  //     if (err) {
  //       return res.status(500).json({ error: err.message });
  //     }
  //     if (results.affectedRows === 0) {
  //       return res.status(404).json({ error: "Revista não encontrada" });
  //     }
  //     res.json({ message: "Revista atualizada com sucesso" });
  //   });
  // },

  update: (req, res) => {
    const { id } = req.params;
    const {
      titulo, dataPdf, prazoEntrega, edicao, chamadaPrincipal, palavraChave,
      autorId, numeroPaginas, codigoBarras, ean, bisac, descricaoBasica,
      categoriaId, editoraId, periodicidade, precoCapa, arquivoAberto, observacao
    } = req.body;
  
    // Verifica se todos os campos obrigatórios estão presentes
    if (!titulo || !autorId || !categoriaId || !editoraId) {
      return res.status(400).json({ error: "Campos obrigatórios estão faltando" });
    }
  
    // Consulta para verificar se as chaves estrangeiras existem
    const checkQuery = `
      SELECT 
        (SELECT COUNT(*) FROM Autor WHERE id = ?) AS autorExists,
        (SELECT COUNT(*) FROM Categoria WHERE id = ?) AS categoriaExists,
        (SELECT COUNT(*) FROM Editora WHERE id = ?) AS editoraExists
    `;
  
    connection.query(checkQuery, [autorId, categoriaId, editoraId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao verificar dependências: " + err.message });
      }
  
      const { autorExists, categoriaExists, editoraExists } = results[0];
  
      if (!autorExists || !categoriaExists || !editoraExists) {
        return res.status(400).json({ 
          error: "ID de autor, categoria ou editora inválido"
        });
      }
  
      // Atualiza a revista se as chaves estrangeiras existirem
      const updateQuery = `
        UPDATE Revista SET 
          titulo = ?, dataPdf = ?, prazoEntrega = ?, edicao = ?, chamadaPrincipal = ?, palavraChave = ?, 
          autorId = ?, numeroPaginas = ?, codigoBarras = ?, ean = ?, bisac = ?, descricaoBasica = ?, 
          categoriaId = ?, editoraId = ?, periodicidade = ?, precoCapa = ?, arquivoAberto = ?, observacao = ?
        WHERE id = ?;
      `;
      const values = [
        titulo, dataPdf, prazoEntrega, edicao, chamadaPrincipal, palavraChave,
        autorId, numeroPaginas, codigoBarras, ean, bisac, descricaoBasica,
        categoriaId, editoraId, periodicidade, precoCapa, arquivoAberto, observacao, id
      ];
  
      connection.query(updateQuery, values, (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Erro ao atualizar revista: " + err.message });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Revista não encontrada" });
        }
        res.json({ message: "Revista atualizada com sucesso" });
      });
    });
  },
  

  delete: (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Revista WHERE id = ?;`;
    connection.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Revista não encontrada" });
      }
      res.json({ message: "Revista deletada com sucesso" });
    });
  },

  getByString: (req, res) => {
    const { searchString } = req.params; // Recebe a string que será utilizada na busca
  
    // Verifica se a string de pesquisa está vazia
    if (!searchString || searchString.trim() === '') {
      return res.status(400).json({ error: 'String de busca não pode ser vazia' });
    }
  
    // Consulta para buscar Revistas que contenham a string no título ou descrição básica
    const sql = `
      SELECT r.*, 
             a.nome AS autorNome, 
             c.nome AS categoriaNome, 
             e.nome AS editoraNome
      FROM Revista r
      LEFT JOIN Autor a ON r.autorId = a.id
      LEFT JOIN Categoria c ON r.categoriaId = c.id
      LEFT JOIN Editora e ON r.editoraId = e.id
      WHERE r.titulo LIKE ? 
         OR r.descricaoBasica LIKE ?`;
  
    const searchPattern = `%${searchString}%`; // Adiciona % para realizar uma busca com LIKE no banco de dados
  
    db.query(sql, [searchPattern, searchPattern], (err, result) => {
      if (err) {
        console.error('Erro ao buscar revistas:', err.message);
        return res.status(500).json({ error: 'Erro ao buscar revistas' });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'Nenhuma revista encontrada' });
      }
      res.json(result); // Retorna as revistas encontradas com os nomes de Autor, Categoria e Editora
    });
  }
};

module.exports = revistaController;
