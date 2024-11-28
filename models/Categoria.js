const db = require('../config/database');

class Categoria {
  constructor(id, nome) {
    this.id = id;
    this.nome = nome;
  }
}

module.exports = Categoria;
