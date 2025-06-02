const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rotas para a entidade "usuarios"

// GET /api/usuarios - Listar todos os usuários (pode ser restrito)
router.get('/', usuariosController.listarUsuarios);

// GET /api/usuarios/:id - Obter um usuário por ID (pode ser restrito)
router.get('/:id', usuariosController.obterUsuarioPorId);

// POST /api/usuarios/cadastro - Cadastrar um novo usuário
router.post('/cadastro', usuariosController.cadastrarUsuario);

// POST /api/usuarios/login - Fazer login
router.post('/login', usuariosController.loginUsuario);

// PUT /api/usuarios/:id - Atualizar um usuário (pode ser restrito ao próprio usuário ou admin)
router.put('/:id', usuariosController.atualizarUsuario);

// DELETE /api/usuarios/:id - Excluir um usuário (geralmente restrito a admin)
router.delete('/:id', usuariosController.excluirUsuario);

module.exports = router;