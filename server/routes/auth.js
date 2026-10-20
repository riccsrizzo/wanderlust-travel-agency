// Importa o módulo principal do Express para gerenciar as rotas da API
const express = require('express');

// Cria uma instância de Router do Express, permitindo modularizar as rotas separadamente do arquivo principal
const router = express.Router();

// Importa a conexão com o banco de dados Neon (o 'pool' configurado no arquivo db.js)
const pool = require('../db');

// Importa a biblioteca bcryptjs, responsável por criptografar senhas de forma segura (hashing)
const bcrypt = require('bcryptjs');

// ===============================================================================================================
// ROTA DE CADASTRO (REGISTER)
// ==========================================
// Define uma rota do tipo POST no caminho '/register'
// (Nota: o prefixo completo será '/api/auth/register', pois será agrupado no index.js)
router.post('/register', async (req, res) => {
  try {
    // Extrai os campos 'nome', 'email' e 'senha' enviados pelo cliente (frontend React) no corpo (body) da requisição
    const { nome, email, senha } = req.body;

    // ----------------------------------------------------
    // PASSO 1: VERIFICAÇÃO DE E-MAIL DUPLICADO
    // ----------------------------------------------------
    // Executa uma consulta SQL no banco Neon para verificar se já existe algum registo com este mesmo e-mail.
    // Usamos '$1' (parâmetro) no lugar de concatenar a variável diretamente.
    // Isto previne vulnerabilidades graves de segurança conhecidas como SQL Injection.
    const utilizadorExiste = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );

    // Se a contagem de linhas retornadas for maior que 0, o e-mail já pertence a outra conta
    if (utilizadorExiste.rows.length > 0) {
      // Retorna imediatamente o código HTTP 400 (Bad Request) com uma mensagem de erro explicativa em JSON
      return res.status(400).json({ error: 'Este e-mail já está registado.' });
    }

    // ----------------------------------------------------
    // PASSO 2: CRIPTOGRAFIA DA SENHA (HASHING)
    // ----------------------------------------------------
    // Gera um "salt" (uma sequência aleatória de dados) com fator de custo 10.
    // O salt garante que duas senhas iguais gerem hashes completamente diferentes no banco.
    const salt = await bcrypt.genSalt(10);

    // Combina a senha digitada pelo utilizador com o salt gerado, transformando-a num código criptografado irreversível
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    // ----------------------------------------------------
    // PASSO 3: INSERÇÃO DO UTILIZADOR NO BANCO DE DADOS
    // ----------------------------------------------------
    // Insere o novo registo na tabela 'users' salvando o nome, o e-mail e a SENHA JÁ CRIPTOGRAFADA.
    // A instrução 'RETURNING id, nome, email' é uma função nativa do PostgreSQL que devolve
    // os dados do registo acabado de criar (excluindo a senha por motivos estritos de segurança).
    const novoUtilizador = await pool.query(
      'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, senhaCriptografada],
    );

    // ----------------------------------------------------
    // PASSO 4: RESPOSTA DE SUCESSO PARA O FRONTEND
    // ----------------------------------------------------
    // Retorna o código HTTP 201 (Created), indicando que um novo recurso foi criado com sucesso,
    // acompanhado de uma mensagem de confirmação e dos dados do utilizador recém-criado.
    res.status(201).json({
      message: 'Utilizador registado com sucesso!',
      utilizador: novoUtilizador.rows[0],
    });
  } catch (erro) {
    // ----------------------------------------------------
    // TRATAMENTO DE ERROS DO SERVIDOR
    // ----------------------------------------------------
    // Se ocorrer qualquer falha inesperada (ex: queda de conexão com o banco Neon ou erro de sintaxe),
    // o fluxo é desviado para este bloco catch.
    console.error('Erro no registo:', erro.message);

    // Retorna o código HTTP 500 (Internal Server Error) informando que algo correu mal no backend
    res
      .status(500)
      .json({ error: 'Erro no servidor ao tentar registar o utilizador.' });
  }
});


// Exporta o mini-router configurado para que ele possa ser importado e ativado no ficheiro principal (server/index.js)
module.exports = router;
