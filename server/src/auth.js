import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db/index.js';
import * as schema from './db/schema.js';

export const auth = betterAuth({
  // URL base do backend (com fallback para o Render em produção)
  baseURL:
    process.env.BETTER_AUTH_URL ||
    'https://wanderlust-travel-agency-i6l9.onrender.com',

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },

  // Permitir origens de desenvolvimento, produção e suporte a requisições com proxy
  trustedOrigins: [
    'http://localhost:5173',
    'http://localhost:5000',
    'https://wanderlust-travel-agency-sigma.vercel.app',
    'https://wanderlust-travel-agency-i6l9.onrender.com',
  ],

  // Avançado: Permite validar origens dinamicamente se necessário
  advanced: {
    useSecureCookies: true,
  },
});
