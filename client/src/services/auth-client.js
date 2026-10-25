import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  fetchOptions: {
    credentials: 'include', // 💡 Envia e recebe cookies cross-domain
  },
});

export const { useSession, signIn, signOut, signUp } = authClient;
