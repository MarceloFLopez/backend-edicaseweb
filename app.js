const express = require('express');
const app = express();

const rotaCliente = require('../minha-aplicacao-node/routes/clienteRouter');
const rotaAutor = require('../minha-aplicacao-node/routes/autorRouter');
const rotaCategoria = require('../minha-aplicacao-node/routes/categoriaRouter');
const rotaEditor = require('../minha-aplicacao-node/routes/editoraRouter');
const rotaBanca = require('../minha-aplicacao-node/routes/bancaRouter');
const rotaArtigo = require('../minha-aplicacao-node/routes/artigoRouter');
const rotaRevista = require('../minha-aplicacao-node/routes/revistaRouter'); 
const rotaSimplicada = require('../minha-aplicacao-node/routes/simplifcadaRouter'); 
const rotaProgramacao = require('../minha-aplicacao-node/routes/programacaoRouter'); 
const rotaSaque = require('../minha-aplicacao-node/routes/saqueRouter'); 
const usuarioRouter = require('../minha-aplicacao-node/routes/usuarioRouter');
const authRouter = require('../minha-aplicacao-node/routes/authRouter');
// Configuração para que o Express possa interpretar JSON
app.use(express.json());

// Usa as rotas de categoria
app.use('/api', rotaCliente);
app.use('/api', rotaAutor);
app.use('/api', rotaCategoria);
app.use('/api', rotaEditor);
app.use('/api', rotaBanca);
app.use('/api', rotaArtigo);
app.use('/api', rotaRevista);
app.use('/api', rotaSimplicada);
app.use('/api', rotaProgramacao);
app.use('/api', rotaSaque);
app.use('/api', usuarioRouter);
app.use('/api', authRouter);


// Define a porta e inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
