import React, { useState, useEffect } from 'react';
// Importa a função fetchPackages do nosso serviço de API centralizado
import { fetchPackages } from '../services/api';

export default function MainContent() {
  // Estado para armazenar a lista completa de pacotes vindos da API do PostgreSQL
  const [destinations, setDestinations] = useState([]);
  
  // Estado para controlar se os dados ainda estão a ser carregados (loading)
  const [loading, setLoading] = useState(true);

  // Estado para guardar eventuais erros de comunicação com o servidor
  const [error, setError] = useState(null);

  // Estado para controlar o filtro selecionado (pode ser 'All', um continente ou 'Favorites')
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Estado para guardar os IDs dos destinos favoritados pelo utilizador (ex: ['paris', 'bali'])
  const [favorites, setFavorites] = useState([]);

  // O useEffect é executado automaticamente assim que o componente é montado na tela
  useEffect(() => {
    // Função assíncrona interna para buscar os pacotes da API
    const loadPackages = async () => {
      try {
        setLoading(true); // Ativa o carregamento
        const data = await fetchPackages(); // Faz o fetch GET na API (/api/packages)
        setDestinations(data); // Guarda os pacotes no estado
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar destinos no componente:', err);
        setError('Não foi possível carregar os pacotes de viagem. Tente novamente mais tarde.');
      } finally {
        setLoading(false); // Desativa o carregamento
      }
    };

    loadPackages();
  }, []); // Roda apenas uma vez ao montar o componente

  // Função para alternar o estado de favorito de um destino (adicionar ou remover da lista)
  const toggleFavorite = (id) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id) // Se já for favorito, remove
        : [...prevFavorites, id] // Se não for, adiciona à lista de favoritos
    );
  };

  // Lista de opções disponíveis para os botões de filtro (incluindo a nova opção 'Favorites')
  const filterOptions = ['All', 'Europe', 'Asia', 'South America', 'Oceania', 'Favorites'];

  // Lógica de filtragem dos destinos com base na opção selecionada
  const filteredDestinations = destinations.filter(dest => {
    // Se o filtro selecionado for 'All', exibe todos os destinos
    if (selectedCategory === 'All') return true;
    
    // Se o filtro selecionado for 'Favorites', exibe apenas os destinos cujos IDs estão no array de favoritos
    if (selectedCategory === 'Favorites') return favorites.includes(dest.id);
    
    // Caso contrário, filtra pelo continente/categoria correspondente
    return dest.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Se estiver a carregar, exibe o indicador visual
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-gray-600 animate-pulse">A carregar pacotes de viagem do servidor...</p>
      </div>
    );
  }

  // Se houver erro, exibe a mensagem de erro
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
        <p className="text-gray-600 mt-2">Dados em tempo real da base de dados PostgreSQL (Neon)</p>
      </div>

      {/* Botões de Filtro (Continentes + Opção de Favoritos) */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedCategory(option)}
            className={`px-5 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
              selectedCategory === option
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {/* Se for a opção de favoritos, adiciona um ícone de coração pequeno no botão */}
            {option === 'Favorites' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-red-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            )}
            {option}
            {/* Mostra um contador de quantos favoritos o utilizador tem */}
            {option === 'Favorites' && ` (${favorites.length})`}
          </button>
        ))}
      </div>

      {/* Mensagem caso o utilizador selecione a aba de favoritos e não tenha nenhum selecionado */}
      {selectedCategory === 'Favorites' && filteredDestinations.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 max-w-xl mx-auto">
          <p className="text-gray-500 text-lg">Ainda não adicionou nenhum destino aos favoritos.</p>
          <p className="text-gray-400 text-sm mt-1">Clique no ícone de coração nos cards de viagem para os guardar aqui!</p>
        </div>
      )}

      {/* Exibição dos cards de destinos dinâmicos filtrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((dest) => {
          // Verifica se este destino específico está marcado como favorito
          const isFavorite = favorites.includes(dest.id);

          return (
            <div key={dest.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow relative">
              
              {/* Imagem do destino */}
              <img src={dest.image} alt={dest.title} className="w-full h-48 object-cover" />

              {/* Botão de Favorito posicionado no canto superior direito da imagem */}
              <button
                onClick={() => toggleFavorite(dest.id)}
                className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white transition-colors"
                title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-gray-600'}`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              {/* Conteúdo do Card */}
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
          );
        })}
      </div>
    </main>
  );
}