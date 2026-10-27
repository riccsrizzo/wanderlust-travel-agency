import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPackageBySlug } from '../services/api';

export function PackageDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // Estado de carregamento do pagamento / Payment loading state

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

  // ==========================================
  // HANDLE STRIPE CHECKOUT REDIRECT / GERAR CHECKOUT DO STRIPE
  // ==========================================
  // Calls the backend checkout route and redirects the user to the Stripe hosted payment page.
  // Chama a rota de checkout do backend e redireciona o utilizador para a página de pagamento do Stripe.
  const handleBuyNow = async (packageId) => {
    try {
      setIsProcessing(true);
      const backendUrl =
        import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const response = await fetch(
        `${backendUrl}/api/checkout/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // CRITICAL: Sends Better Auth session cookies / Envia os cookies de sessão do Better Auth
          body: JSON.stringify({ packageId, quantity: 1 }),
        },
      );

      const data = await response.json();

      // If unauthorized or error, alert user / Se não autorizado ou erro, alerta o utilizador
      if (!response.ok) {
        alert(
          data.error ||
            'Failed to initialize checkout session. Please make sure you are logged in.',
        );
        setIsProcessing(false);
        return;
      }

      // Redirect user to Stripe secure checkout / Redireciona o utilizador para o checkout seguro do Stripe
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error connecting to checkout service:', error);
      alert('An unexpected error occurred. Please try again.');
      setIsProcessing(false);
    }
  };

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

          {/* Secção de reserva / Checkout Button */}
          <div className="border-t border-gray-100 pt-6 flex justify-end">
            <button
              onClick={() => handleBuyNow(pkg.id)}
              disabled={isProcessing}
              className="bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-sm cursor-pointer flex items-center gap-2"
            >
              {isProcessing ? 'Redirecting to Stripe...' : 'Book This Trip Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetail;
