import React, { useState, useEffect } from 'react';
// Importa fetchTestimonials e getImageUrl do serviço centralizado
import { fetchTestimonials, getImageUrl } from '../services/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const data = await fetchTestimonials();
        setTestimonials(data);
        setError(null);
      } catch (err) {
        console.error('Error loading testimonials into component:', err);
        setError('The statements could not be loaded. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section id="testimonials" className="py-16 bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            What Our Travelers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <p className="text-gray-700 italic mb-6">"{item.quote}"</p>

              <div className="flex items-center gap-4">
                {/* Imagem do testemunho com getImageUrl aplicado */}
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <span className="text-sm text-blue-600 font-medium">
                    {item.destination}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
