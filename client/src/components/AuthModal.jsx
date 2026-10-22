import React, { useState } from 'react';
// Importa as funções de login e registo do nosso serviço de API
import { loginUser, registerUser } from '../services/api';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  // Estado para alternar entre a aba de Login (true) e Registo (false)
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Estados locais para capturar os valores dos inputs (mantidos em inglês para a UI)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para gerir mensagens de erro/sucesso e estado de carregamento
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Se o modal não estiver aberto, interrompe a renderização
  if (!isOpen) return null;

  // Função executada ao submeter o formulário (Login ou Registo)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLoginMode) {
        // Envia o email e a senha para a API de login
        const data = await loginUser({ email, senha: password });
        
        // Normaliza os dados do utilizador para garantir compatibilidade (independente de vir 'name' ou 'nome' do backend)
        const loggedUser = {
          id: data.user?.id,
          name: data.user?.name || data.user?.nome || email.split('@')[0],
          email: data.user?.email || email
        };

        // Guarda o utilizador normalizado no localStorage para garantir persistência no refresh (F5)
        localStorage.setItem('user', JSON.stringify(loggedUser));
        
        // Atualiza o estado global/pai com o utilizador logado
        onLoginSuccess(loggedUser);
        onClose(); // Fecha o modal
      } else {
        // Envia 'nome' e 'senha' para o backend no registo
        await registerUser({ 
          nome: name, 
          email, 
          senha: password 
        });
        
        // Após o registo bem-sucedido, muda para o modo de login e avisa o utilizador
        setIsLoginMode(true);
        setError('Registration successful! Please sign in with your new account.');
      }
    } catch (err) {
      // Captura o erro retornado pela API e exibe na interface
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

        {/* Cabeçalho do Modal dinâmico */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {isLoginMode ? 'Sign In to Wanderlust' : 'Create an Account'}
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          {isLoginMode ? 'Welcome back! Please enter your details.' : 'Join us and start planning your next adventure.'}
        </p>

        {/* Caixa de alerta para erros ou sucesso */}
        {error && (
          <div className={`p-3 rounded-lg text-sm mb-4 ${error.includes('successful') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            {error}
          </div>
        )}

        {/* Formulário de Autenticação */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Campo de Nome (Exibido apenas no modo de Registo) */}
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

        {/* Alternador de abas */}
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