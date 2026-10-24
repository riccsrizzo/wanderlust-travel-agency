import { createAuthClient } from 'better-auth/react';

// Criar o cliente de autenticação do Better Auth apontando para o URL do nosso backend Express
export const authClient = createAuthClient({
  baseURL: "http://localhost:5000", // Endereço onde o servidor backend está a correr
});

// Desestruturar e exportar os hooks e funções principais para serem usados nos componentes React
// - useSession: Hook para verificar se o utilizador está autenticado em tempo real
// - signIn: Função para efetuar login
// - signUp: Função para criar nova conta
// - signOut: Função para terminar sessão
export const { useSession, signIn, signOut, signUp } = authClient;
