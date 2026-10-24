import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db/index.js';
import * as schema from './db/schema.js';

export const auth = betterAuth({
  // Atualizado para a porta 5000, onde o servidor está a correr
  baseURL: 'http://localhost:5000',

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },

  // Permitir origens seguras incluindo a porta 5000 e o frontend Vite (5173)
  trustedOrigins: ['http://localhost:5173', 'http://localhost:5000'],
});
