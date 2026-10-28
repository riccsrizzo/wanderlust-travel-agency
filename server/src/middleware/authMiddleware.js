import { auth } from '../auth.js';
import { fromNodeHeaders } from 'better-auth/node';

// ==========================================
// AUTHENTICATION MIDDLEWARE / MIDDLEWARE DE AUTENTICAÇÃO
// ==========================================
// Verifies if the request contains a valid active session using Better Auth.
// Verifica se o pedido contém uma sessão ativa válida usando o Better Auth.
export const requireAuth = async (req, res, next) => {
  try {
    // Fetch session details from the incoming request headers
    // Busca os detalhes da sessão a partir dos cabeçalhos do pedido recebido
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    // If no active session is found, block the request with a 401 Unauthorized status
    // Se nenhuma sessão ativa for encontrada, bloqueia o pedido com o estado 401 Não Autorizado
    if (!session || !session.user) {
      return res
        .status(401)
        .json({
          error:
            'Unauthorized: You must be logged in to proceed with checkout.',
        });
    }

    // Attach the user and session object to the request for downstream use
    // Anexa o objeto do utilizador e da sessão ao pedido para uso posterior nas rotas
    req.user = session.user;
    req.session = session.session;

    // Proceed to the next middleware or route handler
    // Prossegue para o próximo middleware ou controlador da rota
    next();
  } catch (error) {
    console.error('Error verifying authentication session:', error);
    return res
      .status(500)
      .json({ error: 'Internal server error during authentication check.' });
  }
};
