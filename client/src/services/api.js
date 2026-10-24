// URL base da API do backend
const API_URL = 'http://localhost:5000/api';

// Obter todos os pacotes de viagem
export async function fetchPackagesAndTestimonials() {
  const response = await fetch(`${API_URL}/packages`);
  if (!response.ok) {
    throw new Error('Failed to fetch packages.');
  }
  return response.json();
}

// Obter os detalhes de um pacote de viagem específico através do slug
export async function fetchPackageBySlug(slug) {
  const response = await fetch(`${API_URL}/packages/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch package details.');
  }
  return response.json();
}

// Obter os testemunhos dos utilizadores
export async function fetchTestimonials() {
  const response = await fetch(`${API_URL}/testimonials`);
  if (!response.ok) {
    throw new Error('Failed to fetch testimonials.');
  }
  return response.json();
}

// Enviar dados de planeamento de viagem (Corrigido para /plan-trip com hífen)
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
