const express = require('express');
const router = express.Router();
const anunciosController = require('../controllers/anunciosController');

// exemplo de rota para listar todos os anuncioS(plural), nao sei se vou usar
router.get('/anuncios', anunciosController.listarAnuncios);

// exemplo de rota para criar um novo anuncio
router.post('/anuncios', anunciosController.criarAnuncio);

// exemplo de rota para obter um anuncio por ID
router.get('/anuncios/:id', anunciosController.obterAnuncio);

// outras rotas aqui

module.exports = router;