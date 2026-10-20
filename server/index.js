// Importa o framework Express para criação de APIs e gestão de rotas HTTP
const express = require('express');

// Importa o middleware CORS para permitir requisições do frontend (React)
const cors = require('cors');

// Importa o dotenv para carregar as variáveis do ficheiro .env no process.env
require('dotenv').config();

// Inicializa a aplicação Express
const app = express();

// Define a porta do servidor obtida do .env ou utiliza 5000 como padrão
const PORT = process.env.PORT || 5000;

// Configura os middlewares essenciais:
// Permite que a API aceite requisições vindas de diferentes origens (CORS)
app.use(cors());

// Permite que o servidor interprete dados enviados em formato JSON no corpo das requisições (req.body)
app.use(express.json());

// Importa e conecta as rotas de autenticação sob o prefixo /api/auth
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Rota de teste inicial para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.send('API do Wanderlust Travel Agency está rodando com sucesso!');
});

// Inicia o servidor e escuta as requisições na porta configurada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});