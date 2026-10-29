// ==========================================
// DYNAMIC API BASE URL / URL BASE DINÂMICA DA API
// ==========================================
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://wanderlust-travel-agency-i6l9.onrender.com';
const API_URL = BASE_URL.endsWith('/api')
  ? BASE_URL
  : `${BASE_URL.replace(/\/$/, '')}/api`;

// 💡 FUNÇÃO OBRIGATÓRIA EXPORTADA PARA CORRIGIR AS IMAGENS
export function getImageUrl(imagePath) {
  if (!imagePath) return '';
  // Se já for uma URL absoluta (ex: Unsplash), retorna como está
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Caso contrário, adiciona a URL base do Render ao caminho relativo
  const cleanBackend = BASE_URL.replace(/\/api$/, '');
  return `${cleanBackend}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
}

// Obter todos os pacotes de viagem e testemunhos
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

// Enviar dados de planeamento de viagem
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
