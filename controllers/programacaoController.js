const connection = require("../config/database");

const programacaoController = {
  getAll: (req, res) => {
    const query = `
          SELECT 
            p.id,
            r.titulo,
            b.nome,
            p.dataProgramacao,
            p.periodicidade,
            p.envio,
            p.asin,
            p.cid,
            p.status,
            p.envioFtp,
            p.dataArqivoEnvio,
            p.aprovacao,
            p.kit
          FROM 
            Programacao p
          LEFT JOIN 
            Banca b ON p.bancaId = b.id
          LEFT JOIN 
            Revista r ON p.revistaId = r.id;
        `;

    connection.query(query, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao buscar programações: " + err.message });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ error: "Nenhuma programações encontrada." });
      }
      res.status(200).json(results);
    });
  },

  create: (req, res) => {
    const {
      revistaId,
      bancaId,
      dataProgramacao,
      periodicidade,
      envio,
      asin,
      cid,
      status,
      envioFtp,
      dataArqivoEnvio,
      aprovacao,
      kit,
    } = req.body;

    if (!revistaId || !bancaId || !dataProgramacao) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios estão faltando." });
    }

    const query = `
            INSERT INTO Programacao (
                revistaId, bancaId, dataProgramacao, periodicidade, envio, asin, 
                cid, status, envioFtp, dataArqivoEnvio, aprovacao, kit
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

    const values = [
      revistaId,
      bancaId,
      dataProgramacao,
      periodicidade,
      envio,
      asin,
      cid,
      status,
      envioFtp,
      dataArqivoEnvio,
      aprovacao,
      kit,
    ];

    connection.query(query, values, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao criar programação: " + err.message });
      }
      res
        .status(201)
        .json({
          message: "Programação criada com sucesso",
          id: results.insertId,
        });
    });
  },

  getById: (req, res) => {
    const { id } = req.params;

    const query = `
          SELECT 
              p.id,
              r.titulo AS revistaTitulo,
              b.nome AS bancaNome,
              p.dataProgramacao,
              p.periodicidade,
              p.envio,
              p.asin,
              p.cid,
              p.status,
              p.envioFtp,
              p.dataArqivoEnvio,
              p.aprovacao,
              p.kit
          FROM 
              Programacao p
          LEFT JOIN 
              Banca b ON p.bancaId = b.id
          LEFT JOIN 
              Revista r ON p.revistaId = r.id
          WHERE 
              p.id = ?;
      `;

    connection.query(query, [id], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao buscar programação: " + err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Programação não encontrada." });
      }
      res.status(200).json(results[0]);
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const {
      revistaId,
      bancaId,
      dataProgramacao,
      periodicidade,
      envio,
      asin,
      cid,
      status,
      envioFtp,
      dataArqivoEnvio,
      aprovacao,
      kit,
    } = req.body;

    const query = `
        UPDATE Programacao SET 
            revistaId = ?, bancaId = ?, dataProgramacao = ?, periodicidade = ?, 
            envio = ?, asin = ?, cid = ?, status = ?, envioFtp = ?, 
            dataArqivoEnvio = ?, aprovacao = ?, kit = ?
        WHERE id = ?;
    `;

    const values = [
      revistaId,
      bancaId,
      dataProgramacao,
      periodicidade,
      envio,
      asin,
      cid,
      status,
      envioFtp,
      dataArqivoEnvio,
      aprovacao,
      kit,
      id,
    ];

    connection.query(query, values, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao atualizar programação: " + err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Programação não encontrada." });
      }
      res.json({ message: "Programação atualizada com sucesso" });
    });
  },

  delete: (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Programacao WHERE id = ?;`;

    connection.query(query, [id], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao deletar programação: " + err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Programação não encontrada." });
      }
      res.json({ message: "Programação excluída com sucesso" });
    });
  },
  findByString: (req, res) => {
    const { searchString } = req.params; // Recebe a string que será utilizada na busca

    // Verifica se a string de pesquisa está vazia
    if (!searchString || searchString.trim() === "") {
      return res
        .status(400)
        .json({ error: "String de busca não pode ser vazia." });
    }

    const query = `
      SELECT 
          p.id,
          r.titulo AS revistaTitulo,
          b.nome AS bancaNome,
          p.dataProgramacao,
          p.periodicidade,
          p.envio,
          p.asin,
          p.cid,
          p.status,
          p.envioFtp,
          p.dataArqivoEnvio,
          p.aprovacao,
          p.kit
      FROM 
          Programacao p
      LEFT JOIN 
          Revista r ON p.revistaId = r.id
      LEFT JOIN 
          Banca b ON p.bancaId = b.id
      WHERE 
          r.titulo LIKE ?;
  `;

    const searchPattern = `%${searchString}%`; // Adiciona % para busca com LIKE

    connection.query(query, [searchPattern], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao buscar programações: " + err.message });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({
            error: "Nenhuma programação encontrada para a revista informada.",
          });
      }
      res.status(200).json(results);
    });
  },
};

module.exports = programacaoController;
