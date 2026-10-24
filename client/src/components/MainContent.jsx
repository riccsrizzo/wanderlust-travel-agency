import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPackagesAndTestimonials } from '../services/api';
import { useSession } from '../services/auth-client';

export function MainContent() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de filtro e favoritos
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Obter sessão atual do Better Auth
  const { data: session } = useSession();

  // Carregar pacotes do backend
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchPackagesAndTestimonials();
        setPackages(data.packages || []);
      } catch (err) {
        setError('Failed to load travel packages.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Gerir favoritos com base na sessão
  useEffect(() => {
    if (session?.user?.id) {
      const savedFavorites = localStorage.getItem(`favorites_${session.user.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } else {
      setFavorites([]);
      setShowFavoritesOnly(false);
    }
  }, [session]);

  // Alternar favorito
  const toggleFavorite = (slug, e) => {
    e.preventDefault();
    
    if (!session) {
      alert('You must be signed in to save favorites.');
      return;
    }

    let updatedFavorites;
    if (favorites.includes(slug)) {
      updatedFavorites = favorites.filter((fav) => fav !== slug);
    } else {
      updatedFavorites = [...favorites, slug];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${session.user.id}`, JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading travel packages...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  const continents = ['All', 'Europe', 'Asia', 'South America', 'Oceania'];

  // Filtragem flexível de continentes
  const filteredPackages = packages.filter((pkg) => {
    const pkgCategory = (pkg.category || '').trim().toLowerCase();
    const selectedCategory = selectedContinent.trim().toLowerCase();

    const matchesContinent =
      selectedContinent === 'All' || pkgCategory === selectedCategory;

    const matchesFavorites = !showFavoritesOnly || favorites.includes(pkg.slug);
    
    return matchesContinent && matchesFavorites;
  });

  return (
    <section id='packages' className="py-12 px-4 max-w-7xl mx-auto">
      {/* Cabeçalho e Filtros Centralizados */}
      <div className="flex flex-col items-center text-center mb-10 gap-6">
        <h2 className="text-3xl font-bold text-gray-900">Featured Destinations</h2>

        {/* Botões de Filtros Centralizados */}
        <div className="flex flex-wrap justify-center items-center gap-2">
          {continents.map((continent) => (
            <button
              key={continent}
              onClick={() => {
                setSelectedContinent(continent);
                setShowFavoritesOnly(false);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                selectedContinent === continent && !showFavoritesOnly
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {continent}
            </button>
          ))}

          {/* Botão de Favoritos */}
          <button
            onClick={() => {
              if (!session) {
                alert('Please sign in to view your favorites.');
                return;
              }
              setShowFavoritesOnly(!showFavoritesOnly);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              showFavoritesOnly
                ? 'bg-sky-700 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span>❤️ Favorites</span>
            {session && (
              <span className="ml-1 bg-sky-100 text-sky-800 text-xs px-2 py-0.5 rounded-full font-bold">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Grelha de Pacotes */}
      {filteredPackages.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-white rounded-lg border border-gray-100 shadow-sm">
          No destinations found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const isFav = favorites.includes(pkg.slug);
            
            // Garantir conversão numérica correta para exibir o $ em todos os preços
            const numericPrice = Number(pkg.price);
            const displayPrice = !isNaN(numericPrice) ? `$${numericPrice.toLocaleString()}` : `$${pkg.price}`;

            return (
              <div 
                key={pkg.id || pkg.slug} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow relative"
              >
                {/* Botão de Favorito */}
                <button
                  onClick={(e) => toggleFavorite(pkg.slug, e)}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-transform active:scale-95 cursor-pointer z-10"
                  title={isFav ? "Remove from favorites" : "Add to favorites"}
                >
                  <span className={`text-lg ${isFav ? 'text-red-500' : 'text-gray-400'}`}>
                    {isFav ? '❤️' : '🤍'}
                  </span>
                </button>

                {/* Imagem do destino */}
                {pkg.image && (
                  <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
                )}
                
                {/* Conteúdo interno */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider bg-sky-50 px-2.5 py-0.5 rounded-full">
                      {pkg.category}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-2">{pkg.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{pkg.description}</p>
                  </div>

                  {/* Preço formatado com $ garantido */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                    <span className="text-sky-600 font-bold text-lg">
                      {displayPrice}
                    </span>
                    <Link 
                      to={`/packages/${pkg.slug}`}
                      className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm transition-colors shadow-sm inline-block text-center cursor-pointer"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default MainContent;