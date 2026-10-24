const express = require('express');
const router = express.Router();
const pool = require('../../db'); // Importa a conexão com o PostgreSQL (Neon)

// Rota POST para receber o formulário de planeamento de viagem
router.post('/', async (req, res) => {
  const { destination, travelDate, travelers, email, name } = req.body;

  // Validação básica dos campos
  if (!destination || !travelDate || !travelers || !email) {
    return res
      .status(400)
      .json({ error: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  try {
    // Opcional: podemos guardar o pedido na base de dados ou apenas processar o envio do e-mail
    console.log(
      `[EMAIL SIMULADO] A enviar e-mail de confirmação para ${email} referente ao destino ${destination} para ${travelers} passageiro(s) na data ${travelDate}.`,
    );

    // Retorna uma resposta de sucesso para o frontend
    res.status(200).json({
      message: 'Trip planned successfully! A confirmation email has been sent.',
      tripDetails: { destination, travelDate, travelers, email, name },
    });
  } catch (err) {
    console.error('Erro ao processar o planeamento da viagem:', err.message);
    res
      .status(500)
      .json({ error: 'Erro interno no servidor ao processar a viagem.' });
  }
});

module.exports = router;
