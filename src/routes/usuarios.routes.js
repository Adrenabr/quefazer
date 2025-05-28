const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/usuarios', usuariosController.listarUsuarios);

// exemplo de rota para criar um novo usuario
router.post('/usuarios', usuariosController.cadastrarUsuario);

// exemplo de rota para obter um anuncio por ID
router.get('/usuarios/:id', usuariosController.obterUsuario);

// outras rotas aqui

module.exports = router;