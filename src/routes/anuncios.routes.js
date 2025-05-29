const express = require('express');
const router = express.Router();
const anunciosController = require('../controllers/anunciosController');

// Rotas para a entidade "anuncios"

// GET /api/anuncios - Listar todos os anúncios
router.get('/', anunciosController.listarAnuncios);

// GET /api/anuncios/:id - Obter um anúncio por ID
router.get('/:id', anunciosController.obterAnuncioPorId);

// POST /api/anuncios - Criar um novo anúncio
router.post('/', anunciosController.criarAnuncio);

// PUT /api/anuncios/:id - Atualizar um anúncio existente
router.put('/:id', anunciosController.atualizarAnuncio);

// DELETE /api/anuncios/:id - Excluir um anúncio
router.delete('/:id', anunciosController.excluirAnuncio);

module.exports = router;