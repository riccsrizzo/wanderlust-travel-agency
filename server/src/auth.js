import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db/index.js';
import * as schema from './db/schema.js';

export const auth = betterAuth({
  // Garante que em produção usa o URL real do Render
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

  // Inclui todas as origens possíveis de onde os pedidos de auth podem vir
  trustedOrigins: [
    'http://localhost:5173',
    'http://localhost:5000',
    'https://wanderlust-travel-agency-sigma.vercel.app', // Domínio de produção
    'https://wanderlust-travel-agency-i6l9.onrender.com', // O próprio backend
  ],
});
