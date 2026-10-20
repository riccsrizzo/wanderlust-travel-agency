// Importa o Router do Express para gerenciar as rotas de forma modular
const express = require('express');
const router = express.Router();

// Importa a conexão configurada com o banco de dados Neon (Pool)
const pool = require('../db');

// ROTA: OBTER TODOS OS PACOTES DE VIAGEM (GET /api/packages)
router.get('/', async (req, res) => {
  try {
    // Executa a consulta SQL para selecionar todos os registos da tabela destinations
    const result = await pool.query('SELECT * FROM destinations');

    // Retorna os dados encontrados em formato JSON com o código HTTP 200 (OK)
    res.json(result.rows);
  } catch (err) {
    // Regista o erro detalhado na consola do servidor para efeitos de depuração
    console.error('Erro ao buscar pacotes de viagem:', err.message);
    
    // Retorna uma resposta de erro segura e padronizada para o cliente (HTTP 500)
    res.status(500).json({ error: 'Erro interno no servidor ao carregar os pacotes.' });
  }
});

// Exporta o roteador para ser integrado no servidor principal (index.js)
module.exports = router;