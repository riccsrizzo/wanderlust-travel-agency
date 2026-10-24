import { Router } from 'express';
import { db } from '../src/db/index.js';
import { testimonials } from '../src/db/schema.js'; // Ajuste o caminho do schema se necessário

const router = Router();

// Rota para obter apenas os testemunhos
router.get('/testimonials', async (req, res) => {
  try {
    const allTestimonials = await db.select().from(testimonials);
    res.json(allTestimonials);
  } catch (error) {
    console.error('Erro ao obter testemunhos:', error);
    res.status(500).json({ error: 'Failed to load testimonials' });
  }
});

export default router;
