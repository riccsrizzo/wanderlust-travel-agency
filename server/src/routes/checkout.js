import { Router } from 'express';
import Stripe from 'stripe';
import { db } from '../db/index.js';
import { packages, orders, orderItems } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ==========================================
// CREATE CHECKOUT SESSION / ROTA DE CRIAÇÃO DE SESSÃO
// ==========================================
router.post('/create-checkout-session', requireAuth, async (req, res) => {
  try {
    const { packageId, quantity = 1 } = req.body;
    const userId = req.user.id;

    if (!packageId) {
      return res.status(400).json({ error: 'Package ID is required.' });
    }

    // Procura o pacote na base de dados
    const [travelPackage] = await db
      .select()
      .from(packages)
      .where(eq(packages.id, Number(packageId)))
      .limit(1);

    if (!travelPackage) {
      return res.status(404).json({ error: 'Travel package not found.' });
    }

    // Tratamento seguro do preço
    const rawPrice =
      typeof travelPackage.price === 'string'
        ? parseFloat(travelPackage.price.replace(/[^0-9.]/g, ''))
        : Number(travelPackage.price);

    if (isNaN(rawPrice)) {
      return res.status(500).json({ error: 'Invalid package price format.' });
    }

    const unitAmountInCents = Math.round(rawPrice * 100);
    const totalAmount = unitAmountInCents * quantity;
    const tempSessionId = `temp_${Date.now()}`;

    // 1. Cria a ordem na base de dados com status 'pending'
    const [newOrder] = await db
      .insert(orders)
      .values({
        userId: userId,
        stripeCheckoutSessionId: tempSessionId,
        status: 'pending',
        totalAmount: totalAmount,
      })
      .returning();

    // 2. Cria o item associado à ordem
    await db.insert(orderItems).values({
      orderId: newOrder.id,
      packageId: travelPackage.id,
      quantity: quantity,
      price: unitAmountInCents,
    });

    // Converte a imagem relativa numa URL absoluta para o Stripe
    let packageImageUrl = travelPackage.image;
    if (packageImageUrl) {
      if (
        !packageImageUrl.startsWith('http://') &&
        !packageImageUrl.startsWith('https://')
      ) {
        const backendUrl =
          process.env.BETTER_AUTH_URL ||
          'https://wanderlust-travel-agency-i6l9.onrender.com';
        const cleanBackend = backendUrl.replace(/\/api$/, '');
        packageImageUrl = `${cleanBackend}${packageImageUrl.startsWith('/') ? '' : '/'}${packageImageUrl}`;
      }
    }

    // 3. Cria a sessão real de Checkout no Stripe (sem o payment_method_types obsoleto)
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: travelPackage.title,
              description:
                travelPackage.description || 'Travel package experience',
              images: packageImageUrl ? [packageImageUrl] : [],
            },
            unit_amount: unitAmountInCents,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'https://wanderlust-travel-agency-sigma.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://wanderlust-travel-agency-sigma.vercel.app'}/packages/${travelPackage.slug}`,
      metadata: {
        orderId: newOrder.id.toString(),
      },
    });

    // 4. Atualiza a ordem com o ID real da sessão do Stripe
    await db
      .update(orders)
      .set({ stripeCheckoutSessionId: session.id })
      .where(eq(orders.id, newOrder.id));

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return res
      .status(500)
      .json({ error: 'Failed to create checkout session.' });
  }
});

export default router;
