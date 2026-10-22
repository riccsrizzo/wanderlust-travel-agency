import React, { useState, useEffect } from 'react';
// Importa a função fetchTestimonials do nosso serviço de API centralizado
import { fetchTestimonials } from '../services/api';

export default function Testimonials() {
  // Estado para armazenar a lista de testemunhos vindos da API do PostgreSQL
  const [testimonials, setTestimonials] = useState([]);
  
  // Estado para controlar se os dados ainda estão a ser carregados (loading)
  const [loading, setLoading] = useState(true);

  // Estado para guardar eventuais erros de comunicação com o servidor
  const [error, setError] = useState(null);

  // O useEffect é executado automaticamente assim que o componente é montado na tela
  useEffect(() => {
    // Função assíncrona interna para buscar os testemunhos da API
    const loadTestimonials = async () => {
      try {
        setLoading(true); // Ativa o estado de carregamento
        
        // Chama a função assíncrona que faz o fetch GET na nossa API Express (/api/testimonials)
        const data = await fetchTestimonials();
        
        setTestimonials(data); // Guarda os dados reais obtidos do banco Neon no estado
        setError(null);       // Limpa qualquer erro anterior
      } catch (err) {
        console.error('Erro ao carregar testemunhos no componente:', err);
        setError('Não foi possível carregar os depoimentos. Tente novamente mais tarde.');
      } finally {
        setLoading(false); // Desativa o carregamento, independentemente de sucesso ou erro
      }
    };

    loadTestimonials(); // Executa a função de carregamento
  }, []); // O array vazio [] garante que isto roda apenas uma vez quando o componente abre

  // Se a página ainda estiver a carregar os dados do servidor, exibe um aviso visual amigável
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-500 animate-pulse">A carregar depoimentos de clientes...</p>
      </div>
    );
  }

  // Se houver algum erro de conexão, exibe a mensagem de erro na tela
  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">What Our Travelers Say</h2>
          <p className="text-gray-600 mt-2">Depoimentos reais obtidos da base de dados PostgreSQL (Neon)</p>
        </div>

        {/* Exibição dos cards de testemunhos dinâmicos vindos da API */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <p className="text-gray-700 italic mb-6">"{item.quote}"</p>
              
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-500" />
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <span className="text-sm text-blue-600 font-medium">{item.destination}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}