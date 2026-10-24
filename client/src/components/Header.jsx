import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSession, signOut } from '../services/auth-client';
import { AuthModal } from './AuthModal';

export function Header() {
  // Obter o estado da sessão do utilizador em tempo real através do Better Auth
  const { data: session, isPending } = useSession();

  // Estados para controlar o modal de autenticação e o menu mobile
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Função para navegar e fazer scroll suave para as secções da página principal
  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false); // Fecha o menu mobile ao clicar
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logótipo / Nome da Agência de Viagens */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-xl font-extrabold text-sky-600">
            Wanderlust
          </Link>
        </div>

        {/* Links de navegação para Desktop */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
          <Link onClick={() => handleNavClick('hero')} className="hover:text-sky-600 transition-colors">
            Home
          </Link>
          <button
            onClick={() => handleNavClick('packages')}
            className="hover:text-sky-600 transition-colors bg-transparent border-none cursor-pointer text-gray-600 font-medium text-sm"
          >
            Destinations
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="hover:text-sky-600 transition-colors bg-transparent border-none cursor-pointer text-gray-600 font-medium text-sm"
          >
            About
          </button>
        </nav>

        {/* Gestão do Botão de Utilizador / Login (Desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          {isPending ? (
            <span className="text-sm text-gray-400">Loading...</span>
          ) : session ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                Hello, {session.user.name}
              </span>
              <button
                onClick={async () => {
                  await signOut();
                  window.location.reload();
                }}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Botões e Menu Hambúrguer para Mobile */}
        <div className="flex md:hidden items-center space-x-3">
          {!session && !isPending && (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-sky-600 focus:outline-none p-2 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Deslizante para Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <Link
            onClick={() => handleNavClick("hero")}
            className="block text-gray-600 hover:text-sky-600 font-medium py-2 transition-colors"
          >
            Home
          </Link>
          <button
            onClick={() => handleNavClick('packages')}
            className="block w-full text-left text-gray-600 hover:text-sky-600 font-medium py-2 bg-transparent border-none cursor-pointer"
          >
            Destinations
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left text-gray-600 hover:text-sky-600 font-medium py-2 bg-transparent border-none cursor-pointer"
          >
            About
          </button>

          {session && (
            <div className="pt-3 border-t border-gray-100 flex flex-col space-y-2">
              <span className="text-sm font-medium text-gray-700">
                Hello, {session.user.name}
              </span>
              <button
                onClick={async () => {
                  await signOut();
                  window.location.reload();
                }}
                className="w-full text-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal de Autenticação (Login / Registo) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}
