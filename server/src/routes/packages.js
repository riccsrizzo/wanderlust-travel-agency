import { Router } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { packages, testimonials } from '../db/schema.js';

const router = Router();

// Rota para obter todos os pacotes de viagem e testemunhos em simultâneo
router.get('/packages', async (req, res) => {
  try {
    const allPackages = await db.select().from(packages);
    const allTestimonials = await db.select().from(testimonials);

    res.json({
      packages: allPackages,
      testimonials: allTestimonials,
    });
  } catch (error) {
    console.error('Erro ao obter pacotes e testemunhos:', error);
    res.status(500).json({ error: 'Failed to load travel data' });
  }
});

// Rota dedicada para obter apenas os testemunhos
router.get('/testimonials', async (req, res) => {
  try {
    const allTestimonials = await db.select().from(testimonials);
    res.json(allTestimonials);
  } catch (error) {
    console.error('Erro ao obter testemunhos:', error);
    res.status(500).json({ error: 'Failed to load testimonials' });
  }
});

// Rota para obter os detalhes de um pacote específico através do slug
router.get('/packages/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [pkg] = await db
      .select()
      .from(packages)
      .where(eq(packages.slug, slug));

    if (!pkg) {
      return res.status(404).json({ error: 'Travel package not found' });
    }

    res.json(pkg);
  } catch (error) {
    console.error('Erro ao obter pacote por slug:', error);
    res.status(500).json({ error: 'Failed to load package details' });
  }
});

export default router;
