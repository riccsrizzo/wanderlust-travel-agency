import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MainContent } from './components/MainContent';
import Testimonials from './components/Testimonials';
import PlanTrip from './components/PlanTrip';
import PackageDetail from './components/PackageDetail';
import { Success } from './components/Success'; // Importa a página de sucesso do pagamento / Import payment success page

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Cabeçalho fixo / Fixed header */}
        <Header />

        {/* Rotas da aplicação / Application routes */}
        <Routes>
          {/* Página Principal / Home Page */}
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

          {/* Página de Detalhes do Pacote / Package Detail Page */}
          <Route path="/packages/:slug" element={<PackageDetail />} />

          {/* Página de Sucesso do Pagamento (Stripe Redirect) / Payment Success Page */}
          <Route path="/success" element={<Success />} />
        </Routes>

        {/* Rodapé / Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
