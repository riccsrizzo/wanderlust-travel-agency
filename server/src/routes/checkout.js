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

    // STRICT RULE: Never trust the price sent from the browser. Look up the real price from the database!
    const [travelPackage] = await db
      .select()
      .from(packages)
      .where(eq(packages.id, Number(packageId)))
      .limit(1);

    if (!travelPackage) {
      return res.status(404).json({ error: 'Travel package not found.' });
    }

    const rawPrice = parseFloat(travelPackage.price.replace(/[^0-9.]/g, ''));
    const unitAmountInCents = Math.round(rawPrice * 100);
    const totalAmount = unitAmountInCents * quantity;
    const tempSessionId = `temp_${Date.now()}`;

    // 1. Create the order record in the database with 'pending' status
    const [newOrder] = await db
      .insert(orders)
      .values({
        userId: userId,
        stripeCheckoutSessionId: tempSessionId,
        status: 'pending',
        totalAmount: totalAmount,
      })
      .returning();

    // 2. Create the associated order item record
    await db.insert(orderItems).values({
      orderId: newOrder.id,
      packageId: travelPackage.id,
      quantity: quantity,
      price: unitAmountInCents,
    });

    // 3. Create a real Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: travelPackage.title,
              description: travelPackage.description,
              images: travelPackage.image ? [travelPackage.image] : [],
            },
            unit_amount: unitAmountInCents,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cancel`,
      metadata: {
        orderId: newOrder.id.toString(),
      },
    });

    // 4. Update the order with the real Stripe Checkout Session ID
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
