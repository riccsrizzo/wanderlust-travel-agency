// ==========================================
// DYNAMIC API BASE URL / URL BASE DINÂMICO DA API
// ==========================================
// Uses environment variable VITE_API_URL if available, otherwise falls back to the Render backend URL.
// Usa a variável de ambiente VITE_API_URL se disponível, caso contrário usa a URL do backend no Render.
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://wanderlust-travel-agency-1619.onrender.com';

// Ensure the URL correctly points to the /api endpoint
// Garante que a URL aponta corretamente para o endpoint /api sem duplicar
const API_URL = BASE_URL.endsWith('/api')
  ? BASE_URL
  : `${BASE_URL.replace(/\/$/, '')}/api`;

// Obter todos os pacotes de viagem / Fetch all travel packages
export async function fetchPackagesAndTestimonials() {
  const response = await fetch(`${API_URL}/packages`);
  if (!response.ok) {
    throw new Error('Failed to fetch packages.');
  }
  return response.json();
}

// Obter os detalhes de um pacote de viagem específico através do slug / Fetch package details by slug
export async function fetchPackageBySlug(slug) {
  const response = await fetch(`${API_URL}/packages/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch package details.');
  }
  return response.json();
}

// Obter os testemunhos dos utilizadores / Fetch user testimonials
export async function fetchTestimonials() {
  const response = await fetch(`${API_URL}/testimonials`);
  if (!response.ok) {
    throw new Error('Failed to fetch testimonials.');
  }
  return response.json();
}

// Enviar dados de planeamento de viagem / Submit trip planning data
export async function planTrip(tripData) {
  const response = await fetch(`${API_URL}/plan-trip`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripData),
  });
  if (!response.ok) {
    throw new Error('Failed to submit trip plan.');
  }
  return response.json();
}
