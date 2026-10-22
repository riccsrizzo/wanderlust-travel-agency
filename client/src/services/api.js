// ==========================================
// SERVIÇO DE API - COMPLETO (PACOTES, TESTEMUNHOS E AUTENTICAÇÃO)
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
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao realizar login.');
    }
    return data;
  } catch (err) {
    console.error('Erro na requisição loginUser:', err);
    throw err;
  }
};

/**
 * Função assíncrona para registar um novo utilizador na base de dados.
 * @param {Object} userData - Objeto contendo 'name', 'email' e 'password'.
 * @returns {Promise<Object>} Dados de sucesso e dados do utilizador criado.
 */
export const registerUser = async (userData) => {
  try {
    // Envia um pedido HTTP POST para o endpoint de registo (/api/auth/register)
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST', // Método POST para criar um novo registo
      headers: {
        'Content-Type': 'application/json', // Informa o Express que o corpo é um JSON
      },
      body: JSON.stringify(userData), // Converte o objeto do formulário em string JSON
    });
    
    // Converte a resposta recebida do servidor numa estrutura de objeto JavaScript
    const data = await response.json();

    // Verifica se a resposta foi bem-sucedida; caso contrário, lança erro com a mensagem da API
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao registar utilizador.');
    }

    // Retorna os dados de sucesso do novo utilizador criado
    return data;
  } catch (err) {
    console.error('Erro na requisição registerUser:', err);
    throw err;
  }
};

// Função para enviar os dados de planeamento de viagem para a API
export const planTrip = async (tripData) => {
  try {
    const response = await fetch(`${API_URL}/plan-trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to plan trip');
    }

    return data;
  } catch (error) {
    console.error('Erro no serviço planTrip:', error);
    throw error;
  }
};
