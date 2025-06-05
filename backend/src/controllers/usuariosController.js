const Usuario = require('../models/usuario');    // Importa o model.
const argon2 = require('argon2');   // Importa biblioteca argon2.
const usuariosService = require('../services/usuariosService'); // Importa o service.
const { validationResult } = require('express-validator');
//const { body, validationResult } = require('express-validator');
/*
// Controlador para listar usuários com suporte a filtros.
const listarUsuarios = async (req, res) => {
    try {
        const filtros = req.query;  // Obtém os parâmetros de consulta da URL (ex: /usuarios?). Estes serão usados para filtrar os usuarios.
        const usuarios = await usuariosService.listarUsuariosComFiltros(filtros);   // Chama a função no 'usuariosService' para buscar os usuarios. 'await' indica que esta é uma operação assíncrona.
        res.status(200).json(usuarios); // Responde com um status HTTP 200 (OK) e envia os usuarios encontrados no formato JSON.
    } catch (error) {
        console.error('Erro ao listar usuários:', error); // Registra o erro no console para depuração.
        res.status(500).json({ error: error.message || 'Erro ao buscar usuários.'});    // Responde com um status HTTP 500 (Internal Server Error) e uma mensagem de erro, pegando a mensagem específica do erro ou uma mensagem genérica.
    }
};

// Controlador para obter um usuário específico pelo ID.
const obterUsuarioPorId = async (req, res) => {
    const { id } = req.params;  // Extrai o parâmetro 'id' da URL.
    try {
        const usuario = await Usuario.getUsuarioById(id);   // Chama a função no model 'Usuario' para buscar um usuario pelo seu ID.
        if (usuario) {
            res.status(200).json(usuario);  // Se o usuario for encontrado, responde com status 200 e o usuario em JSON.
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' }); // Se o usuário não for encontrado, responde com status 404 (Not Found) e uma mensagem.
        }
    } catch (error) {
        console.error(`Erro ao buscar usuário com ID ${id}:`, error);   // Registra o erro no console, incluindo o ID que estava sendo buscado.
        res.status(500).json({ error: error.message || 'Erro ao buscar usuário.' });  // Responde com status 500 e uma mensagem de erro genérica.
    }
};

// Controlador para cadastrar um usuario.
const cadastrarUsuario = async (req, res) => {

    const usuarioData = req.body;   // Obtém os dados do novo usuario do corpo da requisição (geralmente em formato JSON).
    const usuarioLogado = req.usuario; // Tendo um middleware de autenticação que adiciona informações do usuário logado na requisição, importante que nenhum usuario logado possa registrar um novo usuario.
    try {
        const novoUsuario = await usuariosService.cadastrarUsuarioComValidacao(usuarioData, usuarioLogado); // Chama a função no 'usuariosService' para criar um novo usuario, possivelmente realizando validações nos dados.
        res.status(201).json(novoUsuario);  // Responde com status 201 (Created) e o novo usuario criado em JSON.
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error); // Registra o erro no console.
        res.status(400).json({ error: error.message }); // Responde com status 400 (Bad Request) e a mensagem de erro, geralmente indicando um problema com os dados da requisição (validação falhou).
    }
};

// Controlador para verificar senha de usuario.
const verificarSenha = async (senha, senha_hash) => {
    try {
        return await argon2.verify(senha, senha_hash); // Retorna true ou false
    } catch (error) {
        console.error('Erro ao verificar senha:', error);
        return false;   // modificar para lançar o erro
    }
};

//Controlador para realizar login de usuario
const loginUsuario = async () => {};

// Controlador para excluir um usuário, não sei se será utilizado.*
const excluirUsuario = async (req, res) => {  };
*/
// Controlador para cadastrar um usuário.
exports.cadastrarUsuario = async (req, res) => {
    
    const errors = validationResult(req); // Esta linha é importante para capturar os erros de validação da rota
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { cadastroUsuario, cadastroEmail, cadastroSenha, primeiroNome, ultimoNome } = req.body; // Extrai os dados do corpo de requisição.

    try {
        // Passa os dados para o service.
        const novoUsuario = await usuariosService.cadastrarUsuario(cadastroUsuario, cadastroEmail, cadastroSenha, primeiroNome, ultimoNome);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario});
    } catch (error) {
        console.error('Erro ao cadastrar usuário (no controller): ', error);
        // O erro 'Este email já está cadastrado.' vem do service é tratado aqui.
        if (error.message === 'Este email já está cadastrado.') {
            return res.status(409).json({ message: error.message });
        }
        // O erro 'Este nome de usuário já está em uso.' vem do service e é tratado aqui.
        if (error.message === 'Este nome de usuário já está em uso.') {
            return res.status(409).json({ message: error.message});
        }
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};
/*
module.exports = {
    listarUsuarios,
    obterUsuarioPorId,
    verificarSenha,
    loginUsuario,
    excluirUsuario,
};*/
// exports.listarUsuarios = async (req, res) => { /* ... */ };
// exports.obterUsuarioPorId = async (req, res) => { /* ... */ };
// exports.verificarSenha = async (req, res) => { /* ... */ };
// exports.loginUsuario = async (req, res) => { /* ... */ };
// exports.excluirUsuario = async (req, res) => { /* ... */ };