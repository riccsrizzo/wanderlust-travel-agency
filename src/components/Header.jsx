import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-full mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
        {/* Logotipo */}
        <div className="font-bold text-xl tracking-tight text-sky-600">
          <a href="#hero">Wanderlust</a>
        </div>

        {/* Botão do X */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative w-8 h-8 flex items-center justify-center focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`absolute h-0.5 w-6 bg-slate-800 rounded-full transition-all duration-300 ${
              isMenuOpen ? 'rotate-45' : '-translate-y-2'
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 bg-slate-800 rounded-full transition-all duration-300 ${
              isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 bg-slate-800 rounded-full transition-all duration-300 ${
              isMenuOpen ? '-rotate-45' : 'translate-y-2'
            }`}
          ></span>
        </button>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#hero"
            className="text-slate-600 hover:text-sky-600 font-medium transition-colors"
          >
            Home
          </a>
          <a
            href="#packages"
            className="text-slate-600 hover:text-sky-600 font-medium transition-colors"
          >
            Packages
          </a>
          <a
            href="#testimonials"
            className="text-slate-600 hover:text-sky-600 font-medium transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#plan-trip"
            className="bg-sky-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-sky-700 transition-colors shadow-sm"
          >
            Plan Your Trip
          </a>
        </nav>
      </div>

      {/* Menu Dropdown Mobile */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-slate-100 px-4 pt-4 pb-6 shadow-lg flex flex-col gap-4 text-center">
          <a
            href="#hero"
            onClick={() => setIsMenuOpen(false)}
            className="text-slate-600 hover:text-sky-600 font-medium py-2 transition-colors"
          >
            Home
          </a>
          <a
            href="#packages"
            onClick={() => setIsMenuOpen(false)}
            className="text-slate-600 hover:text-sky-600 font-medium py-2 transition-colors"
          >
            Packages
          </a>
          <a
            href="#testimonials"
            onClick={() => setIsMenuOpen(false)}
            className="text-slate-600 hover:text-sky-600 font-medium py-2 transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#plan-trip"
            onClick={() => setIsMenuOpen(false)}
            className="bg-sky-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-sky-700 transition-colors shadow-sm block"
          >
            Plan Your Trip
          </a>
        </nav>
      )}
    </header>
  );
}
