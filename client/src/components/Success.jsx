import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// ==========================================
// PAYMENT SUCCESS COMPONENT / COMPONENTE DE SUCESSO DE PAGAMENTO
// ==========================================
// Confirms that the user has completed the checkout process on Stripe.
// Confirma que o utilizador concluiu o processo de checkout no Stripe.
export function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  // Optional automatic redirect back to home after a few seconds
  // Redirecionamento automático opcional para a página inicial após alguns segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-lg shadow-lg border border-gray-100 text-center">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
        ✓
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Payment Successful!
      </h1>

      <p className="text-gray-600 mb-6">
        Thank you for booking your trip with Wanderlust Travel Agency. Your
        payment was processed successfully!
      </p>

      {sessionId && (
        <p className="text-xs text-gray-400 mb-6 break-all">
          Session ID: {sessionId}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate('/')}
          className="bg-sky-600 hover:bg-sky-700 text-white py-2.5 px-4 rounded-md font-medium transition-colors cursor-pointer"
        >
          Return to Home
        </button>

        <p className="text-xs text-gray-500">
          Redirecting automatically in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}

export default Success;
