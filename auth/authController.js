const connection = require('../config/database');
const bcrypt = require('bcrypt');  // ou require('bcryptjs');
const jwt = require('jsonwebtoken'); // Importa o pacote jsonwebtoken

module.exports = {

  // Endpoint de login
  login: (req, res) => {
    const { email, senha } = req.body;  // Pegando o email e senha do corpo da requisição

    // Verificar se o email existe no banco
    const query = 'SELECT * FROM Usuario WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao verificar o email.' });
      }

      // Se o email não for encontrado
      if (results.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      const usuario = results[0];  // Pegando o primeiro usuário encontrado

      // Verificar se o usuário está ativo
      if (usuario.ativo === 0 || usuario.ativo === false) {  // Checando se o usuário está ativo
        return res.status(403).json({ error: 'Usuário inativo. Entre em contato com o suporte.' });
      }

      // Verificar se a senha fornecida corresponde à senha armazenada
      bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao verificar a senha.' });
        }

        // Se a senha não corresponder
        if (!isMatch) {
          return res.status(401).json({ error: 'Senha incorreta.' });
        }

        // Criar o token JWT com id e role do usuário
        const token = jwt.sign({ id: usuario.id, role: usuario.role }, 'secreta', {
          expiresIn: '30m',  // O token expira em 30 minutos
        });

        // Retornar o token no response para o cliente
        res.json({ token });
      });
    });
  },

  logout: (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({ error: 'Token não fornecido ou malformado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.decode(token, { complete: true });
      if (!decoded || !decoded.payload) {
        return res.status(400).json({ error: 'Token inválido ou malformado.' });
      }

      // Verificar se o token já foi revogado
      const checkQuery = 'SELECT * FROM RevokedTokens WHERE token = ?';
      connection.query(checkQuery, [token], (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao verificar o token revogado.' });
        }

        if (results.length > 0) {
          return res.status(400).json({ error: 'O logout já foi realizado para este token.' });
        }

        // Verificar se o token já expirou
        const expiresAt = new Date(decoded.payload.exp * 1000);
        if (expiresAt < Date.now()) {
          // Token expirado, registrar no banco como revogado
          const query = 'INSERT INTO RevokedTokens (token, expires_at) VALUES (?, ?)';
          connection.query(query, [token, expiresAt], (err, results) => {
            if (err) {
              return res.status(500).json({ error: 'Erro ao registrar token revogado: ' + err.message });
            }
            return res.status(400).json({ error: 'Token expirado. Faça login novamente!' });
          });
        } else {
          // Caso o token ainda não tenha expirado, registrar normalmente como revogado
          const query = 'INSERT INTO RevokedTokens (token, expires_at) VALUES (?, ?)';
          connection.query(query, [token, expiresAt], (err, results) => {
            if (err) {
              return res.status(500).json({ error: 'Erro ao registrar token revogado: ' + err.message });
            }
            res.json({ message: 'Logout realizado com sucesso!' });
          });
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao processar o token no logout.' });
    }
  },
};
