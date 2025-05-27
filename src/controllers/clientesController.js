const clientesService = require('../services/clientesService');

exports.cadastrarCliente = async (req, res) => {
    try {
        const novoCliente = await clientesService.criar(req.body);
        res.status(201).json(novoCliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar cliente.'});
    }
};

exports.obterCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await clientesService.obterPorId(id);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ message: 'Cliente não encontrado.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter cliente.'});
    }
};

// outras funcoes para criar, atualizar, deletar