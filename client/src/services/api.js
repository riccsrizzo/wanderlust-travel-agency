// ==========================================
// SERVIÇO DE API - PACOTES, TESTEMUNHOS E LOGIN
// ==========================================

// Define o endereço base do servidor backend onde a API está alojada.
const API_URL = 'http://localhost:5000/api';

/**
 * Função assíncrona para buscar todos os pacotes de viagem da base de dados.
 * @returns {Promise<Array>} Array de objetos com os destinos turísticos.
 */
export const fetchPackages = async () => {
  try {
    const response = await fetch(`${API_URL}/packages`);
    if (!response.ok) {
      throw new Error('Erro ao carregar os pacotes de viagem do servidor.');
    }
    return await response.json();
  } catch (err) {
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
    const response = await fetch(`${API_URL}/testimonials`);
    if (!response.ok) {
      throw new Error('Erro ao carregar os testemunhos do servidor.');
    }
    return await response.json();
  } catch (err) {
    console.error('Erro na requisição fetchTestimonials:', err);
    throw err;
  }
};

/**
 * Função assíncrona para efetuar o login do utilizador.
 * @param {Object} credentials - Objeto contendo o 'email' e a 'password'.
 * @returns {Promise<Object>} Dados de sucesso e dados públicos do utilizador autenticado.
 */
export const loginUser = async (credentials) => {
  try {
    // Envia um pedido HTTP POST para o endpoint de login (/api/auth/login)
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST', // Método POST para envio seguro de credenciais
      headers: {
        'Content-Type': 'application/json', // Avisa o Express que o corpo da requisição é JSON
      },
      body: JSON.stringify(credentials), // Converte o objeto JavaScript em string JSON
    });
    
    // Converte a resposta do servidor em JSON
    const data = await response.json();

    // Se o status HTTP não for de sucesso, lança um erro com a mensagem enviada pelo backend
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao realizar login.');
    }

    // Retorna os dados de sucesso para o componente que acionou o login
    return data;
  } catch (err) {
    console.error('Erro na requisição loginUser:', err);
    throw err;
  }
};