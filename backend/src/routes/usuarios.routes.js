const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { body, validationResult } = require('express-validator');
console.log('usuariosController:', usuariosController); // Adicione esta linha
/*
// Rotas para a entidade "usuarios"

// GET /api/usuarios - Listar todos os usuários (pode ser restrito)
router.get('/', usuariosController.listarUsuarios);

// GET /api/usuarios/:id - Obter um usuário por ID (pode ser restrito)
router.get('/:id', usuariosController.obterUsuarioPorId);
*/
// POST /api/usuarios/cadastro - Cadastrar um novo usuário
router.post('/cadastro', [
    // Validação dos campos usando express-validator
    body('cadastroUsuario')
        .notEmpty().withMessage('O campo usuário é obrigatório.')
        .isLength({ min: 6 }).withMessage('O nome de usuário deve ter no mínimo 6 caracteres.')
        .trim()     // Remove espaços em branco do início/fim
        .escape(),  // Escapa caracteres HTML no nome de usuário para segurança
    body('cadastroEmail')
        .isEmail().withMessage('Insira um email válido.'),
    body('cadastroSenha')
        .isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres.'),
    ], usuariosController.cadastrarUsuario);    // A função será executada quando esta rota for acessada.
/*
// POST /api/usuarios/login - Fazer login
router.post('/login', usuariosController.loginUsuario);

// PUT /api/usuarios/:id - Atualizar um usuário (pode ser restrito ao próprio usuário ou admin)
//router.put('/:id', usuariosController.atualizarUsuario);

// DELETE /api/usuarios/:id - Excluir um usuário (geralmente restrito a admin)
router.delete('/:id', usuariosController.excluirUsuario);
*/
module.exports = router;