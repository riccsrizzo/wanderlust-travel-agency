import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPackageBySlug } from '../services/api';

export function PackageDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar os dados do pacote específico ao montar o componente ou alterar o slug
  useEffect(() => {
    async function loadPackageDetails() {
      try {
        setLoading(true);
        const data = await fetchPackageBySlug(slug);
        setPkg(data);
      } catch (err) {
        setError('Failed to load package details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPackageDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">
        Loading package details...
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="text-center py-20 text-red-500">
        {error || 'Package not found.'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 flex-1">
      {/* Botão para voltar à página anterior */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sky-600 hover:text-sky-700 font-medium flex items-center gap-2 transition-colors cursor-pointer"
      >
        &larr; Back to Destinations
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
        {/* Imagem de destaque do destino */}
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-96 object-cover"
        />

        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full">
                {pkg.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                {pkg.title}
              </h1>
            </div>
            <div className="text-left md:text-right">
              <span className="text-3xl font-bold text-sky-600">
                ${pkg.price}
              </span>
              <p className="text-sm text-gray-500 mt-1">
                Duration: {pkg.duration}
              </p>
            </div>
          </div>

          <p className="text-gray-700 text-base leading-relaxed mb-8">
            {pkg.description}
          </p>

          {/* Secção de reserva */}
          <div className="border-t border-gray-100 pt-6 flex justify-end">
            <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-sm cursor-pointer">
              Book This Trip Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetail;
