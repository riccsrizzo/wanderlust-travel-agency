// Importa a classe Pool do pacote 'pg' (node-postgres)
// O Pool permite gerir múltiplas conexões simultâneas com o banco de dados de forma eficiente
const { Pool } = require('pg');

// Carrega as variáveis de ambiente do ficheiro .env para o process.env
require('dotenv').config();

// Cria uma nova instância de Pool utilizando a URL de conexão segura fornecida pelo Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Obtém a URL secreta definida no ficheiro .env
  ssl: {
    rejectUnauthorized: false // Configuração obrigatória para permitir conexões SSL seguras com o Neon na nuvem
  }
});

// Exporta o pool para ser utilizado nos ficheiros de rotas (ex: autenticação, pacotes de viagens, etc.)
module.exports = pool;