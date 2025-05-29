const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rotas para a entidade "clientes"

// GET /api/clientes - Listar todos os clientes (pode ser restrito)
router.get('/', clientesController.listarClientes);

// POST /api/clientes - Cadastrar cliente // revisar
router.post('/cadastro', clientesController.cadastrarCliente);

// GET /api/clientes/:id - Obter um cliente pelo ID
router.get('/:id', clientesController.obterCliente);

// outras rotas aqui

module.exports = router;