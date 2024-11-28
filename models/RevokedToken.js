const connection = require('../config/database'); // Configuração do banco de dados

const RevokedToken = {
  save: (token, expiresAt) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO RevokedTokens (token, expires_at) VALUES (?, ?)';
      connection.query(query, [token, expiresAt], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  isRevoked: (token) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM RevokedTokens WHERE token = ?';
      connection.query(query, [token], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.length > 0);
      });
    });
  },
};
module.exports = RevokedToken;
