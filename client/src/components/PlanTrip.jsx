import React, { useState, useEffect } from 'react';
import { planTrip } from '../services/api';

export default function PlanTrip() {
  // Estados para os campos do formulário de planeamento
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // Estados de controlo de feedback visual
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Preenche automaticamente o e-mail e nome se o utilizador estiver logado
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userObj = JSON.parse(savedUser);
        if (userObj.email) setEmail(userObj.email);
        if (userObj.name) setName(userObj.name);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Função executada ao submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Chama a API convertendo 'travelers' explicitamente para número inteiro
      const response = await planTrip({
        destination,
        travelDate,
        travelers: Number(travelers),
        email,
        name: name || 'Traveler',
      });

      setSuccessMessage(
        response.message || 'Trip successfully planned! Check your email.',
      );

      // Limpa os campos do formulário
      setDestination('');
      setTravelDate('');
      setTravelers(1);
    } catch (err) {
      setError(err.message || 'An error occurred while planning your trip.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="plan-trip" className="py-16 bg-blue-50 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Plan Your Dream Trip
          </h2>
          <p className="text-gray-600 mt-2">
            Fill out the details below and we'll email you a customized
            itinerary!
          </p>
        </div>

        {/* Mensagem de Sucesso */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
            {successMessage}
          </div>
        )}

        {/* Mensagem de Erro */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address (for itinerary)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Paris, Tokyo"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Travel Date
              </label>
              <input
                type="date"
                required
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Travelers
              </label>
              <input
                type="number"
                min="1"
                max="20"
                required
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Botão de Submissão corrigido */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 text-white font-medium py-3 rounded-lg hover:bg-sky-700 transition-colors shadow-md disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Processing & Sending Email...' : 'Send Trip Itinerary'}
          </button>
        </form>
      </div>
    </section>
  );
}
