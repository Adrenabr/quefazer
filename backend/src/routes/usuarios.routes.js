const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { body, validationResult } = require('express-validator');

// POST /api/usuarios/cadastro - Cadastrar um novo usuário
router.post('/cadastro', [
    // Validação dos campos usando express-validator
    body('cadastroUsuario')
        .notEmpty().withMessage('O campo usuário é obrigatório.')
        .matches(/^\S*$/).withMessage('O nome de usuário não pode conter espaços em branco.')   // Regex que verifica se não há espaços em branco
        .isLength({ min: 6, max: 20 }).withMessage('O nome de usuário deve ter entre 6 e 20 caracteres.')
        .isAlphanumeric().withMessage('O nome de usuário deve conter apenas letras e números.')
        .trim()     // Remove espaços em branco do início/fim
        .escape(),  // Escapa caracteres HTML no nome de usuário para segurança
    body('cadastroEmail')
        .isEmail().withMessage('Insira um email válido.'),
    body('cadastroSenha')
        .isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres.'),
    body('confirmarSenha')
        .custom((value, { req } ) => {
            if (value !== req.body.cadastroSenha) {
                throw new Error('As senhas não coincidem.');
            }
            return true;
        }),
    ], usuariosController.cadastrarUsuario);    // A função será executada quando esta rota for acessada.

module.exports = router;