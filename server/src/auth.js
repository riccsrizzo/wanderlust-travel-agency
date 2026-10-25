import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db/index.js';
import * as schema from './db/schema.js';

export const auth = betterAuth({
  // Usa a variável de ambiente no Render e o localhost para testes locais
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },

  // Permite requisições vindas do frontend local e do domínio oficial na Vercel
  trustedOrigins: [
    'http://localhost:5173',
    'http://localhost:5000',
    'https://wanderlust-travel-agency-sigma.vercel.app', // Domínio real da Vercel
  ],
});
