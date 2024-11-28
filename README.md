
# Documentação da Aplicação (Back-End)

## Índice
1. [Descrição](#descrição)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Arquitetura](#arquitetura)
4. [Instalação](#instalação)
5. [API](#api)
   - [Endpoints](#endpoints)
   - [Exemplo de Requisição](#exemplo-de-requisição)
6. [Segurança](#segurança)
7. [Estrutura do Projeto](#estrutura-do-projeto)
8. [Como Subir o Projeto](#como-subir-o-projeto)

---

## Descrição

Esta aplicação é um **backend desenvolvido com Node.js**, utilizando **Express.js** para a criação de uma API **RESTful**. O sistema implementa funcionalidades de autenticação com **JWT (JSON Web Tokens)** e gerenciamento de usuários com **MySQL** como banco de dados.

## Tecnologias Utilizadas

- **Backend:**
  - **Node.js** - Ambiente de execução JavaScript no lado do servidor.
  - **Express.js** - Framework para construção de APIs RESTful.
  - **MySQL** - Banco de dados relacional utilizado para armazenar as informações de usuários.
  - **JWT (JSON Web Tokens)** - Para autenticação de usuários.
  - **Bcrypt.js** - Para criptografia de senhas.

## Arquitetura

A arquitetura da aplicação segue o padrão **RESTful**, com rotas protegidas por **JWT**. A autenticação é feita ao realizar o login, onde um token é gerado e enviado ao cliente, que o utiliza para acessar rotas protegidas. Não há exclusões de registros, e todos os dados são manipulados com segurança.

### Fluxo de Autenticação

1. **Login**: O usuário envia e-mail e senha para a API.
2. **Token**: Se as credenciais forem válidas, a API gera um token JWT.
3. **Armazenamento do Token**: O cliente armazena o token (geralmente no `localStorage` ou `sessionStorage`).
4. **Requisições Protegidas**: O token é enviado nas requisições subsequentes para acessar rotas protegidas.
5. **Logout**: O token é removido do armazenamento, invalidando o acesso.

## Instalação

### Backend (Node.js)

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Acesse o diretório do backend:

   ```bash
   cd backend
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure as credenciais do banco de dados no arquivo `.env`.

5. Rode o servidor:

   ```bash
   npm start
   ```

   O servidor estará rodando na porta `3000`.

## API

A API fornece endpoints para cadastro de usuários, login e logout, com autenticação baseada em JWT. A segurança é garantida pela validação do token JWT nas rotas protegidas.

### Endpoints

#### 1. **Login**

- **Método:** `POST`
- **URL:** `/login`
- **Descrição:** Realiza a autenticação do usuário.
- **Body:**
  ```json
  {
    "email": "usuario@dominio.com",
    "senha": "senha_do_usuario"
  }
  ```
- **Resposta (sucesso):**
  ```json
  {
    "token": "JWT_TOKEN_AQUI"
  }
  ```
- **Resposta (erro):**
  ```json
  {
    "error": "Usuário não encontrado" 
  }
  ```

#### 2. **Criar Usuário**

- **Método:** `POST`
- **URL:** `/usuarios`
- **Descrição:** Cria um novo usuário.
- **Body:**
  ```json
  {
    "nome": "Nome do Usuário",
    "email": "usuario@dominio.com",
    "senha": "senha_do_usuario",
    "role": "usuario",
    "ativo": true
  }
  ```
- **Resposta (sucesso):**
  ```json
  {
    "message": "Usuário criado com sucesso!"
  }
  ```
- **Resposta (erro):**
  ```json
  {
    "error": "Erro ao criar usuário"
  }
  ```

#### 3. **Obter Usuário por ID**

- **Método:** `GET`
- **URL:** `/usuarios/:id`
- **Descrição:** Obtém um usuário pelo ID.
- **Resposta (sucesso):**
  ```json
  {
    "id": 1,
    "nome": "Nome do Usuário",
    "email": "usuario@dominio.com",
    "role": "usuario",
    "ativo": true
  }
  ```

#### 4. **Atualizar Usuário**

- **Método:** `PUT`
- **URL:** `/usuarios/:id`
- **Descrição:** Atualiza os dados de um usuário existente.
- **Body:**
  ```json
  {
    "nome": "Novo Nome",
    "email": "novo_email@dominio.com",
    "senha": "nova_senha",
    "role": "admin",
    "ativo": true
  }
  ```
- **Resposta (sucesso):**
  ```json
  {
    "message": "Usuário atualizado com sucesso!"
  }
  ```

#### 5. **Logout**

- **Método:** `POST`
- **URL:** `/logout`
- **Descrição:** Realiza o logout do usuário, invalidando o token JWT.
- **Resposta (sucesso):**
  ```json
  {
    "message": "Logout realizado com sucesso!"
  }
  ```

### Exemplo de Requisição com Axios

```js
import axios from 'axios';

const login = async (email, senha) => {
  try {
    const response = await axios.post('http://localhost:3000/login', { email, senha });
    const token = response.data.token;
    localStorage.setItem('token', token); // Armazena o token no localStorage
  } catch (error) {
    console.error('Erro ao fazer login:', error.response.data);
  }
};
```

## Segurança

A aplicação utiliza **JWT** para autenticação de usuários. O token JWT é gerado durante o login e enviado para o cliente, que o utiliza nas requisições subsequentes para acessar rotas protegidas. Para garantir a segurança, o token deve ser incluído no cabeçalho de cada requisição como `Authorization: Bearer <token>`.

Além disso, **Bcrypt.js** é utilizado para criptografar as senhas dos usuários antes de armazená-las no banco de dados, garantindo que elas nunca sejam armazenadas em texto claro.

### Camada de Segurança

- **Autenticação JWT**: Todas as rotas protegidas verificam a validade do token JWT.
- **Criptografia de Senhas**: O Bcrypt.js garante que as senhas sejam armazenadas de forma segura.
- **Proteção de Rota**: As rotas que exigem autenticação verificam o token presente no cabeçalho da requisição.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
backend/
├── auth/                 # Lógica de autenticação (JWT, login/logout)
├── config/               # Configurações do banco de dados, etc.
├── controllers/          # Controladores (funções de controle da API)
├── middleware/           # Middlewares (Autenticação, verificação de permissões)
├── models/               # Modelos do banco de dados (estruturas das tabelas)
├── node_modules/         # Dependências do Node.js
├── routes/               # Definições das rotas da API
├── .env                  # Arquivo de configuração do ambiente
├── app.js                # Configuração do servidor Express
├── package-lock.json     # Lock file para as dependências
└── package.json          # Dependências e scripts do projeto
```

## Como Subir o Projeto

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Acesse o diretório do backend:

   ```bash
   cd backend
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure as credenciais do banco de dados no arquivo `.env`.

5. Rode o servidor:

   ```bash
   npm start
   ```

   O servidor estará rodando na porta `3000`.

---

**Agradecimentos**:  
Agradeço ao **ChatGPT** por sua assistência no desenvolvimento da aplicação e na elaboração da documentação.

---
```

### Como Usar:

1. Crie um arquivo chamado `README.md` no seu diretório raiz do repositório Git.
2. Copie e cole o conteúdo acima no arquivo.
3. Adicione o arquivo ao seu repositório Git com os seguintes comandos:

```bash
git add README.md
git commit -m "Adicionando documentação ao projeto"
git push
```

Agora você terá sua documentação do back-end configurada no repositório Git!
