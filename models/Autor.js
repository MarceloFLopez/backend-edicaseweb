const db = require('../config/database');

class Autor {
  constructor(id, nome) {
    this.id = id;
    this.nome = nome;
  }
}

module.exports = Autor;
