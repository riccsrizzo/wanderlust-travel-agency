import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MainContent } from './components/MainContent';
import Testimonials from './components/Testimonials';
import PlanTrip from './components/PlanTrip';
import PackageDetail from './components/PackageDetail';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Cabeçalho fixo */}
        <Header />

        {/* Rotas da aplicação */}
        <Routes>
          {/* Página Principal */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <MainContent />
                <Testimonials />
                <PlanTrip />
              </>
            }
          />

          {/* Página de Detalhes do Pacote */}
          <Route path="/packages/:slug" element={<PackageDetail />} />
        </Routes>

        {/* Rodapé */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
