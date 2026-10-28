import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth.js';
import packagesRouter from './routes/packages.js';
import checkoutRouter from './routes/checkout.js'; // Novo router de checkout do Stripe / New Stripe checkout router
import webhookRouter from './routes/webhook.js'; // Novo router de webhook do Stripe / New Stripe webhook router
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Servir imagens estáticas da pasta uploads / Serve static images from uploads folder
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ==========================================
// DYNAMIC CORS CONFIGURATION / CONFIGURAÇÃO DINÂMICA DE CORS
// ==========================================
// Automatically allows localhost, main production, and any Vercel preview deployment URL (*.vercel.app)
// Permite automaticamente o localhost e qualquer URL de preview ou produção da Vercel (*.vercel.app)
const allowedOrigins = [
  'http://localhost:5173',
  'https://wanderlust-travel-agency-sigma.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, postman, or server-to-server)
      // Permite pedidos sem origem (ex: ferramentas de teste ou requisições internas)
      if (!origin) return callback(null, true);

      // Check if origin is explicitly allowed or ends with .vercel.app
      // Verifica se a origem está na lista ou se termina com .vercel.app
      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

// ==========================================
// STRIPE WEBHOOK ROUTE (CRITICAL POSITIONING)
// ==========================================
// Must be registered BEFORE express.json() to preserve the raw body stream for signature verification.
// Deve ser registada ANTES do express.json() para preservar o fluxo de bytes bruto para a verificação de assinatura.
app.use(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  webhookRouter,
);

// Global JSON parser for all other standard API routes
// Analisador JSON global para todas as outras rotas normais da API
app.use(express.json());

// Integrar as rotas de autenticação do Better Auth usando RegExp para evitar erros de path-to-regexp
app.all(/^\/api\/auth(\/.*)?$/, toNodeHandler(auth));

// Registar as rotas de pacotes e testemunhos sob o prefixo /api
app.use('/api', packagesRouter);

// Registar as rotas de checkout do Stripe sob o prefixo /api/checkout
app.use('/api/checkout', checkoutRouter);

// Rota para planear viagem (Definida antes do app.listen)
app.post('/api/plan-trip', async (req, res) => {
  try {
    const { destination, travelDate, travelers, email, name } = req.body;

    console.log('Planeamento recebido com sucesso:', {
      destination,
      travelDate,
      travelers,
      email,
      name,
    });

    res.status(201).json({
      success: true,
      message: 'Trip successfully planned! Check your email.',
    });
  } catch (error) {
    console.error('Erro ao planear viagem:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit trip plan.',
    });
  }
});

// Iniciar o servidor na porta 5000 (Sempre colocado no final)
app.listen(PORT, () => {
  console.log(`Servidor backend a correr com sucesso na porta ${PORT}`);
});
