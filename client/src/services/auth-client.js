import { createAuthClient } from 'better-auth/react';

// ==========================================
// BETTER AUTH CLIENT CONFIGURATION
// ==========================================
// Ensures the baseURL points to the root domain of the backend (stripping trailing '/api' if present)
// Garante que o baseURL aponta para a raiz do backend, removendo qualquer '/api' acidental
const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const cleanBaseURL = rawApiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');

export const authClient = createAuthClient({
  baseURL: cleanBaseURL,
  fetchOptions: {
    credentials: 'include', // Crucial: allows sending and receiving cookies cross-domain between Vercel and Render
  },
});

export const { useSession, signIn, signOut, signUp } = authClient;
