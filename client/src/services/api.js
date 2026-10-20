// Define o endereço base do servidor backend onde a API está alojada.
const API_URL = 'http://localhost:5000/api';

/**
 * Função assíncrona para buscar todos os pacotes de viagem da base de dados.
 * @returns {Promise<Array>} Array de objetos com os destinos turísticos.
 */
export const fetchPackages = async () => {
  try {
    // Faz um pedido HTTP GET para a rota '/packages' do backend.
    const response = await fetch(`${API_URL}/packages`);

    // Verifica se a resposta foi bem-sucedida (status HTTP entre 200 e 299).
    if (!response.ok) {
      throw new Error('Erro ao carregar os pacotes de viagem do servidor.');
    }

    // Converte os dados brutos recebidos da rede num array/objeto JavaScript.
    return await response.json();
  } catch (err) {
    // Regista o erro na consola para depuração e propaga-o para cima.
    console.error('Erro na requisição fetchPackages:', err);
    throw err;
  }
};

/**
 * Função assíncrona para buscar todos os testemunhos de clientes da base de dados.
 * @returns {Promise<Array>} Array de objetos com as avaliações dos clientes.
 */
export const fetchTestimonials = async () => {
  try {
    // Faz um pedido HTTP GET para a rota '/testimonials' do backend.
    const response = await fetch(`${API_URL}/testimonials`);

    // Valida se a resposta foi bem-sucedida (status HTTP 2xx).
    if (!response.ok) {
      throw new Error('Erro ao carregar os testemunhos do servidor.');
    }

    // Converte a resposta bruta da rede num array JavaScript formatado em JSON.
    const data = await response.json();
    
    // Devolve os testemunhos para o componente React que chamou a função.
    return data;
  } catch (err) {
    // Regista o erro detalhado na consola para efeitos de depuração.
    console.error('Erro na requisição fetchTestimonials:', err);
    throw err;
  }
};