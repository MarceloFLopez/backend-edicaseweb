const express = require('express');
const cors = require('cors');
const app = express();

// Configurar o CORS
const corsOptions = {
  origin: 'http://localhost:3001', // URL do frontend React
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

// Usar o middleware CORS no Express
app.use(cors(corsOptions));


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


// Resto do código da sua API
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Define a porta e inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
