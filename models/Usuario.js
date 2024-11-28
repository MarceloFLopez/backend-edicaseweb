const bcrypt = require('bcryptjs');
const connection = require('../config/database'); 

class Usuario {
  constructor(id, nome, email, senha, role, ativo) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.role = role; // 'user' ou 'manager'
    this.ativo = ativo;
  }

  // Função para comparar a senha fornecida com a senha armazenada
  static async compararSenhas(senhaFornecida, senhaArmazenada) {
    return bcrypt.compare(senhaFornecida, senhaArmazenada);
  }

  // Função para criptografar a senha antes de salvar no banco de dados
  static async criptografarSenha(senha) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(senha, salt);
  }

  static async save(usuario) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Usuario (nome, email, senha, role, ativo) VALUES (?, ?, ?, ?, ?)';
      connection.query(
        query,
        [usuario.nome, usuario.email, usuario.senha, usuario.role, usuario.ativo],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: results.insertId,
              nome: usuario.nome,
              email: usuario.email,
              role: usuario.role,
              ativo: usuario.ativo
            });
          }
        }
      );
    });
  }

  static async getByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Usuario WHERE email = ?';
      connection.query(query, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0 ? results[0] : null);
        }
      });
    });
  }
}

module.exports = Usuario;
