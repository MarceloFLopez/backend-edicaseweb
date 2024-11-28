// controllers/usuarioController.js
const connection = require('../config/database');
const Usuario = require('../models/Usuario'); 
const bcrypt = require('bcrypt');  // ou require('bcryptjs');
const jwt = require('jsonwebtoken'); // Importa o pacote jsonwebtoken

module.exports = {
  // 1. Listar todos os usuários
  getAll: (req, res) => {
    const query = 'SELECT * FROM Usuario';
    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar usuários: ' + err.message });
      }
      const usuarios = results.map(row => new Usuario(row.id, row.nome, row.email, row.senha, row.role, row.ativo));
      res.json(usuarios);
    });
  },

  // 2. Criar um novo usuário
  create: (req, res) => {
    const { nome, email, senha, role } = req.body;

    // Verificar se o email já está em uso
    const checkEmailQuery = 'SELECT * FROM Usuario WHERE email = ?';
    connection.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao verificar o email: ' + err.message });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Este email já está em uso.' });
        }

        // Inserir novo usuário
        const insertUserQuery = 'INSERT INTO Usuario (nome, email, senha, role) VALUES (?, ?, ?, ?)';
        bcrypt.hash(senha, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao criptografar a senha: ' + err.message });
            }

            connection.query(insertUserQuery, [nome, email, hashedPassword, role], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao criar usuário: ' + err.message });
                }

                const newUser = {
                    id: results.insertId,
                    nome,
                    email,
                    role
                };

                res.status(201).json({
                    message: 'Usuário criado com sucesso!',
                    usuario: newUser
                });
            });
        });
    });
},

// controllers/usuarioController.js
createAdminUser: (req, res) => {
  const query = 'INSERT INTO Usuario (nome, email, senha, role, ativo) VALUES (?, ?, ?, ?, ?)';
  const nome = 'Admin';
  const email = 'admin@admin.com';
  const senha = 'senhaAdmin';  // Senha a ser encriptada
  const role = 'manager';  // Role de admin
  const ativo = true;  // Usuário ativo inicialmente

  // Gera o hash da senha antes de salvar no banco de dados
  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao encriptar a senha: ' + err.message });
    }

    // Agora usa o hashedPassword para salvar no banco
    connection.query(query, [nome, email, hashedPassword, role], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar usuário admin: ' + err.message });
      }
      res.status(201).json({ message: 'Usuário admin criado com sucesso!' });
    });
  });
},

createUser: (req, res) => {
  const query = 'INSERT INTO Usuario (nome, email, senha, role) VALUES (?, ?, ?, ?)';
  const nome = 'User';
  const email = 'user@user.com';
  const senha = 'senhaUser';  // Senha a ser encriptada
  const role = 'user';  // Role de admin

  // Gera o hash da senha antes de salvar no banco de dados
  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao encriptar a senha: ' + err.message });
    }

    // Agora usa o hashedPassword para salvar no banco
    connection.query(query, [nome, email, hashedPassword, role], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar usuário simples: ' + err.message });
      }
      res.status(201).json({ message: 'Usuário simples criado com sucesso!' });
    });
  });
},

  // 3. Atualizar usuário
  update: (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, role, ativo } = req.body;
    const query = 'UPDATE Usuario SET nome = ?, email = ?, senha = ?, role = ? , ativo = ? WHERE id = ?';
    connection.query(query, [nome, email, senha, role, ativo, id], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar usuário: ' + err.message });
      }
      res.json({ message: 'Usuário atualizado com sucesso!' });
    });
  },

// 4. Obter usuário por ID
getById: (req, res) => {
  const { id } = req.params;  // Pegando o ID do usuário da URL

  // Query para selecionar o usuário pelo ID
  const query = 'SELECT * FROM Usuario WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar usuário: ' + err.message });
    }

    // Verificar se o usuário foi encontrado
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Retornar os dados do usuário
    res.json(results[0]);
  });
},


  // 4. Deletar usuário
  delete: (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Usuario WHERE id = ?';

    connection.query(query, [id], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao deletar usuário: ' + err.message });
      }
      res.json({ message: 'Usuário deletado com sucesso!' });
    });
  },

  // 5. Buscar usuário por email
  getByEmail: (req, res) => {
    const { email } = req.params;
    const query = 'SELECT * FROM Usuario WHERE email LIKE ?';
    const searchParam = `%${email}%`; // Adiciona os coringas para a busca

    connection.query(query, [searchParam], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuário por email: ' + err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado com o padrão informado.' });
        }

        // Caso encontre, retorna a lista de usuários correspondentes
        const usuarios = results.map((user) => ({
            id: user.id,
            nome: user.nome,
            email: user.email,
            role: user.role,
            ativo: user.ativo
        }));

        res.json(usuarios);
    });
},
};
