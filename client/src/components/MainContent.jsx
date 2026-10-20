import React, { useState, useEffect } from 'react';
// Importa a função fetchPackages do nosso serviço de API centralizado
import { fetchPackages } from '../services/api';

export default function MainContent() {
  // Estado para armazenar a lista de pacotes vindos da API do PostgreSQL
  const [destinations, setDestinations] = useState([]);
  
  // Estado para controlar se os dados ainda estão a ser carregados (loading)
  const [loading, setLoading] = useState(true);

  // Estado para guardar eventuais erros de comunicação com o servidor
  const [error, setError] = useState(null);

  // Estado para controlar a categoria selecionada nos filtros (ex: 'All', 'Europe', 'Asia', etc.)
  const [selectedCategory, setSelectedCategory] = useState('All');

  // O useEffect é executado automaticamente assim que o componente é montado na tela (equivalente ao carregamento inicial da página)
  useEffect(() => {
    // Função assíncrona interna para buscar os pacotes da API
    const loadPackages = async () => {
      try {
        setLoading(true); // Ativa o estado de carregamento enquanto aguarda a resposta
        
        // Chama a função assíncrona que faz o fetch GET na nossa API Express (/api/packages)
        const data = await fetchPackages();
        
        setDestinations(data); // Guarda os dados reais obtidos do banco Neon no estado
        setError(null);       // Limpa qualquer erro anterior
      } catch (err) {
        console.error('Erro ao carregar destinos no componente:', err);
        setError('Não foi possível carregar os pacotes de viagem. Tente novamente mais tarde.');
      } finally {
        setLoading(false); // Desativa o estado de carregamento, independentemente de sucesso ou erro
      }
    };

    loadPackages(); // Executa a função de carregamento
  }, []); // O array vazio [] garante que isto roda apenas uma vez quando o componente abre

  // Filtra os destinos com base na categoria selecionada pelo utilizador
  const filteredDestinations = selectedCategory === 'All'
    ? destinations
    : destinations.filter(dest => dest.category.toLowerCase() === selectedCategory.toLowerCase());

  // Se a página ainda estiver a carregar os dados do servidor, exibe um aviso visual amigável
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-gray-600 animate-pulse">A carregar pacotes de viagem do servidor...</p>
      </div>
    );
  }

  // Se houver algum erro de conexão, exibe a mensagem de erro na tela
  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Explore Our Tour Packages</h2>
        <p className="text-gray-600 mt-2">Dados obtidos em tempo real da base de dados PostgreSQL (Neon)</p>
      </div>

      {/* Exibição dos cards de destinos dinâmicos vindos da API */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((dest) => (
          <div key={dest.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            <img src={dest.image} alt={dest.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{dest.category}</span>
              <h3 className="text-xl font-bold text-gray-900 mt-1">{dest.title}</h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">{dest.description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">{dest.price}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{dest.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}