const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.get('/clientes', clientesController.listarClientes);

// exemplo de rota para criar um novo cliente
router.post('/clientes', clientesController.cadastrarCliente);

// exemplo de rota para obter um anuncio por ID
router.get('/clientes/:id', clientesController.obterCliente);

// outras rotas aqui

module.exports = router;