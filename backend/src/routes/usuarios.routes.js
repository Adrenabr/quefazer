const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { body, validationResult } = require('express-validator');


// Rotas para a entidade "usuarios"

// GET /api/usuarios - Listar todos os usuários (pode ser restrito)
router.get('/', usuariosController.listarUsuarios);

// GET /api/usuarios/:id - Obter um usuário por ID (pode ser restrito)
router.get('/:id', usuariosController.obterUsuarioPorId);

// POST /api/usuarios/cadastro - Cadastrar um novo usuário
router.post('/cadastro', [
    // Validação dos campos usando express-validator
    body('usuario').notEmpty().withMessage('O campo usuário é obrigatório.'),
    body('email').isEmail().withMessage('Insira um email válido.'),
    body('senha').isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres.')
    ], usuariosController.cadastrarUsuario);    // A função será executada quando esta rota for acessada.

// POST /api/usuarios/login - Fazer login
router.post('/login', usuariosController.loginUsuario);

// PUT /api/usuarios/:id - Atualizar um usuário (pode ser restrito ao próprio usuário ou admin)
router.put('/:id', usuariosController.atualizarUsuario);

// DELETE /api/usuarios/:id - Excluir um usuário (geralmente restrito a admin)
router.delete('/:id', usuariosController.excluirUsuario);

module.exports = router;