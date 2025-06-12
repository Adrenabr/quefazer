const Usuario = require('../models/usuario');    // Importa o model.
const argon2 = require('argon2');   // Importa biblioteca argon2.
const usuariosService = require('../services/usuariosService'); // Importa o service.
const { validationResult } = require('express-validator');

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