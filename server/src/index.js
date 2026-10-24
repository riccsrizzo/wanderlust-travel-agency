import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth.js';
import packagesRouter from './routes/packages.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Servir imagens estáticas da pasta uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Configurar o CORS para permitir pedidos do frontend Vite (porta 5173)
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());

// Integrar as rotas de autenticação do Better Auth usando RegExp para evitar erros de path-to-regexp
app.all(/^\/api\/auth(\/.*)?$/, toNodeHandler(auth));

// Registar as rotas de pacotes e testemunhos sob o prefixo /api
app.use('/api', packagesRouter);

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
