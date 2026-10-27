import { Router } from 'express';
import Stripe from 'stripe';
import { db } from '../db/index.js';
import { orders } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const router = Router();

// Initialize Stripe with the secret key
// Inicializa o Stripe com a chave secreta de ambiente
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ==========================================
// STRIPE WEBHOOK ROUTE / ROTA DE WEBHOOK DO STRIPE
// ==========================================
// This route listens for secure server-to-server events from Stripe.
// Esta rota escuta eventos seguros enviados diretamente pelos servidores do Stripe.
router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify the signature using the raw body to ensure the request is genuinely from Stripe
    // Verifica a assinatura usando o corpo bruto (raw body) para garantir que o pedido é legítimo do Stripe
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the successful checkout session completed event
  // Processa o evento de conclusão bem-sucedida da sessão de checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      // Update the order status to 'paid' in the database — the ONLY authorized way to confirm payment!
      // Atualiza o estado da encomenda para 'paid' na base de dados — a ÚNICA forma autorizada de confirmar o pagamento!
      await db
        .update(orders)
        .set({ status: 'paid' })
        .where(eq(orders.id, Number(orderId)));

      console.log(`Order #${orderId} successfully marked as PAID via webhook.`);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  // Retorna um status 200 para confirmar o recebimento do evento ao Stripe
  return res.status(200).json({ received: true });
});

export default router;
