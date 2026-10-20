const express = require('express');
const router = express.Router();
const pool = require('../db');


// ROTA: OBTER TODOS OS TESTEMUNHOS (GET /api/testimonials)
router.get('/', async (req, res) => {
  try {
    // Consulta a tabela testimonials na base de dados Neon
    const result = await pool.query('SELECT * FROM testimonials');

    // Retorna os testemunhos em formato JSON com código HTTP 200 (OK)
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar testemunhos:', err.message);
    res.status(500).json({ error: 'Erro interno no servidor ao carregar os testemunhos.' });
  }
});

module.exports = router;