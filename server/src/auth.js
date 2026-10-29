import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db/index.js';
import * as schema from './db/schema.js';

export const auth = betterAuth({
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

  trustedOrigins: [
    'http://localhost:5173',
    'http://localhost:5000',
    'https://wanderlust-travel-agency-sigma.vercel.app',
    'https://wanderlust-travel-agency-i6l9.onrender.com',
    // Permite dinamicamente qualquer URL de preview ou produção da Vercel (*.vercel.app)
    (origin) => origin && origin.endsWith('.vercel.app'),
  ],

  // 💡 Habilitar suporte a cookies cross-site (Render <-> Vercel)
  advanced: {
    useSecureCookies: true,
    cookiePrefix: 'wanderlust',
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
    },
  },
});
