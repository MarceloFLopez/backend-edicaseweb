const connection = require("../config/database"); // Substitua pelo caminho correto da sua configuração de banco de dados

class Revista {
  constructor(
    id,
    titulo,
    dataPdf,
    prazoEntrega,
    edicao,
    chamadaPrincipal,
    palavraChave,
    autorId,
    numeroPaginas,
    codigoBarras,
    ean,
    bisac,
    descricaoBasica,
    categoriaId,
    editoraId,
    periodicidade,
    precoCapa,
    arquivoAberto,
    observacao
  ) {
    this.id = id;
    this.titulo = titulo;
    this.dataPdf = dataPdf;
    this.prazoEntrega = prazoEntrega;
    this.edicao = edicao;
    this.chamadaPrincipal = chamadaPrincipal;
    this.palavraChave = palavraChave;
    this.autorId = autorId;
    this.numeroPaginas = numeroPaginas;
    this.codigoBarras = codigoBarras;
    this.ean = ean;
    this.bisac = bisac;
    this.descricaoBasica = descricaoBasica;
    this.categoriaId = categoriaId;
    this.editoraId = editoraId;
    this.periodicidade = periodicidade;
    this.precoCapa = precoCapa;
    this.arquivoAberto = arquivoAberto;
    this.observacao = observacao;
  }
}
