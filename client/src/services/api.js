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
    const data = await response.json();
    
    // Devolve os pacotes para o componente React que chamou esta função.
    return data;
  } catch (err) {
    // Regista o erro na consola para depuração e propaga-o para cima.
    console.error('Erro na requisição fetchPackages:', err);
    throw err;
  }
};