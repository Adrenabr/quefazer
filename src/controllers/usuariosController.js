const usuariosService = require('../services/usuariosService');

exports.cadastrarUsuario = async (req, res) => {
    try {
        const novoUsuario = await usuariosService.criar(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar usuário.'});
    }
};

exports.obterUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuariosService.obterPorId(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter usuário.'});
    }
};

// outras funcoes para criar, atualizar, deletar