import { createAuthClient } from 'better-auth/react';

// Criar o cliente de autenticação do Better Auth dinamicamente
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Desestruturar e exportar os hooks e funções principais para serem usados nos componentes React
export const { useSession, signIn, signOut, signUp } = authClient;
