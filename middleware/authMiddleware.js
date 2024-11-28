const jwt = require('jsonwebtoken');
const connection = require('../config/database');

const authMiddleware = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    // Verificar se o token já foi revogado
    const checkQuery = 'SELECT * FROM RevokedTokens WHERE token = ?';
    connection.query(checkQuery, [token], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao verificar token revogado.' });
      }

      if (results.length > 0) {
        return res.status(403).json({ error: 'Token revogado. Faça login novamente.' });
      }

      // Validar o token
      jwt.verify(token, 'secreta', (err, user) => {
        if (err) {
          // Se o token tiver expirado, registramos no banco automaticamente
          if (err.name === 'TokenExpiredError') {
            const decoded = jwt.decode(token);
            const expiresAt = new Date(decoded.exp * 1000);

            // Inserir o token na tabela de tokens revogados
            const query = 'INSERT INTO RevokedTokens (token, expires_at) VALUES (?, ?)';
            connection.query(query, [token, expiresAt], (err) => {
              if (err) {
                return res.status(500).json({ error: 'Erro ao registrar token revogado automaticamente.' });
              }
              return res.status(401).json({ error: 'Token expirado. Faça login novamente!' });
            });
          } else {
            return res.status(403).json({ error: 'Token inválido.' });
          }
        }

        req.user = user;
        next();
      });
    });
  },
};

module.exports = authMiddleware;
