import { useState } from "react";
import { destinations } from "../data/destinations";

export function MainContent() {
  // Estado para controlar a categoria selecionada (começa com "All")
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extrair categorias únicas dinamicamente do array de dados + "All"
  const categories = ["All", ...new Set(destinations.map((d) => d.category))];

  // Filtrar os destinos com base na categoria selecionada
  const filteredDestinations = selectedCategory === "All"
    ? destinations
    : destinations.filter((d) => d.category === selectedCategory);

  return (
    <section id="packages" className="py-20 bg-slate-50">
      <div className="max-w-full mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        {/* Título da Seção */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Popular Tour Packages
          </h2>
          <p className="text-slate-600">
            Choose from our curated selection of top-rated destinations around the world.
          </p>
        </div>

        {/* Botões de Filtro por Categoria */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                selectedCategory === category
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grelha de Destinos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div 
              key={destination.id} 
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Imagem do Destino */}
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img 
                  src={destination.image} 
                  alt={destination.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                  {destination.category}
                </span>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6 flex flex-col grow space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{destination.title}</h3>
                  <span className="text-sky-600 font-bold whitespace-nowrap">{destination.price}</span>
                </div>

                <p className="text-slate-600 text-sm line-clamp-2">
                  {destination.description}
                </p>

                <div className="pt-2 mt-auto border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
                  <span>{destination.duration}</span>
                  <button className="text-sky-600 font-semibold hover:text-sky-700 transition-colors">
                    View Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}