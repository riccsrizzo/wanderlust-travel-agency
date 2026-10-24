import React, { useState } from 'react';
import { signIn, signUp } from '../services/auth-client';

export function AuthModal({ isOpen, onClose }) {
  // Estado para alternar entre o modo de Login e o modo de Registo (Sign Up)
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Se o modal não estiver aberto, não renderiza nada no ecrã
  if (!isOpen) return null;

  // Função para lidar com a submissão do formulário (Login ou Registo)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        // Registar novo utilizador através do Better Auth
        const result = await signUp.email({
          email,
          password,
          name,
        });
        if (result.error) {
          setError(result.error.message);
        } else {
          onClose(); // Fecha o modal após o registo bem-sucedido
        }
      } else {
        // Efetuar login com email e palavra-passe
        const result = await signIn.email({
          email,
          password,
        });
        if (result.error) {
          setError(result.error.message);
        } else {
          onClose(); // Fecha o modal após o login bem-sucedido
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {/* Cabeçalho do Modal em Inglês */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Mensagem de erro caso ocorra alguma falha na autenticação */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        {/* Formulário de Autenticação */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de Nome (apenas visível no modo de Registo) */}
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-sky-500 focus:outline-none"
              />
            </div>
          )}

          {/* Campo de Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Campo de Palavra-passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Botão de Submissão com o tom sky-600 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-600 py-3 font-semibold text-white transition-colors hover:bg-sky-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {/* Alternar entre Login e Registo */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-medium text-sky-600 hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}
