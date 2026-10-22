import React, { useState } from 'react';
// Importa as funções de login e registo do nosso serviço de API
import { loginUser, registerUser } from '../services/api';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  // Estado para alternar entre a aba de Login (true) e Registo (false)
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Estados para capturar os valores dos inputs dos formulários
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para mensagens de erro ou sucesso na interface
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Se o modal não estiver aberto, não renderiza nada na tela
  if (!isOpen) return null;

  // Função executada ao submeter o formulário (seja Login ou Registo)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLoginMode) {
        // Executa a requisição de Login na API
        const data = await loginUser({ email, password });
        
        // Guarda os dados do utilizador no localStorage para sobreviver ao refresh da página
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Notifica o componente pai que o login foi bem-sucedido
        onLoginSuccess(data.user);
        onClose(); // Fecha o modal
      } else {
        // Executa a requisição de Registo na API
        const data = await registerUser({ name, email, password });
        
        // Após registar com sucesso, muda automaticamente para o modo de login
        setIsLoginMode(true);
        setError('Registration successful! Please sign in with your new account.');
      }
    } catch (err) {
      // Captura a mensagem de erro enviada pela API e exibe no formulário
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative">
        
        {/* Botão para fechar o modal */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        {/* Cabeçalho do Modal dinâmico (Sign In / Sign Up) */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {isLoginMode ? 'Sign In to Wanderlust' : 'Create an Account'}
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          {isLoginMode ? 'Welcome back! Please enter your details.' : 'Join us and start planning your next adventure.'}
        </p>

        {/* Mensagem de Erro ou Alerta */}
        {error && (
          <div className={`p-3 rounded-lg text-sm mb-4 ${error.includes('successful') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            {error}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Campo de Nome (Apenas visível no modo de Registo) */}
          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}

          {/* Campo de E-mail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Campo de Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Botão de Submissão */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        {/* Alternador entre Login e Registo */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              type="button"
              onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }}
              className="text-blue-600 font-medium hover:underline focus:outline-none"
            >
              {isLoginMode ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}