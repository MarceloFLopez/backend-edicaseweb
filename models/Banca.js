const db = require('../config/database');

class Banca{
    constructor(id, nome, ativacaoTitulos, formatoPdf, format, prazoMedio, site, comoAcessar, pagmForm, beneficios, mediAssinantes, situacao) {
        this.id = id;
        this.nome = nome;
        this.ativacaoTitulos = ativacaoTitulos;
        this.formatoPdf = formatoPdf;
        this.format = format;
        this.prazoMedio = prazoMedio;
        this.site = site;
        this.comoAcessar = comoAcessar;
        this.pagmForm = pagmForm;
        this.beneficios = beneficios;
        this.mediAssinantes = mediAssinantes;
        this.situacao = situacao;
    } 
}

module.exports = Banca;
