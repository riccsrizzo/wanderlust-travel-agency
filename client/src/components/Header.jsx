import React, { useState, useEffect } from 'react';
// Importa o componente do Modal de Autenticação
import AuthModal from './AuthModal';

export default function Header() {
  // Estado para controlar se o modal de autenticação está aberto ou fechado
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Inicializa o estado diretamente a partir do localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Função executada quando o login é bem-sucedido
  const handleLoginSuccess = (user) => {
    setCurrentUser(user); // Atualiza o estado com os dados do utilizador logado
    window.location.reload(); // Recarrega a página para sincronizar os favoritos e o estado global instantaneamente
  };

  // Função para terminar a sessão (Logout)
  const handleSignOut = () => {
    localStorage.removeItem('user'); // Remove o utilizador do armazenamento local
    setCurrentUser(null); // Limpa o estado local
    window.location.reload(); // Recarrega a página para limpar todos os estados e favoritos da tela
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logótipo / Nome da Agência */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">Wanderlust</span>
          <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
            Travel Agency
          </span>
        </div>

        {/* Links de Navegação */}
        <nav className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
          <a href="#hero" className="hover:text-blue-600 transition-colors">
            Home
          </a>
          <a href="#packages" className="hover:text-blue-600 transition-colors">
            Packages
          </a>
          <a
            href="#testimonials"
            className="hover:text-blue-600 transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#plan-trip"
            className="hover:text-blue-600 transition-colors"
          >
            Plan Trip
          </a>
        </nav>

        {/* Área de Autenticação Dinâmica */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                Hello,{' '}
                <strong className="text-blue-600">{currentUser.name}</strong>
              </span>
              <button
                onClick={handleSignOut}
                className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-lg text-sm font-medium shadow-md transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Modal de Autenticação */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
}
