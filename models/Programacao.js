class Programacao {
  construtor(
    id,
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
    kit
  ) {
    this.id = id;
    this.revistaId = revistaId;
    this.bancaId = bancaId;
    this.dataProgramacao = dataProgramacao;
    this.periodicidade = periodicidade;
    this.envio = envio;
    this.asin = asin;
    this.cid = cid;
    this.status = status;
    this.envioFtp = envioFtp;
    this.dataArqivoEnvio = dataArqivoEnvio;
    this.aprovacao = aprovacao;
    this.kit = kit;
  }
}
