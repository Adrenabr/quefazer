const anunciosService = require('../services/anunciosService');

exports.listarAnuncios = async (req, res) => {
    try {
        const anuncios = await anunciosService.listarTodos();
        res.json(anuncios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar anúncios.'});
    }
};

exports.criarAnuncio = async (req, res) => {
    try {
        const novoAnuncio = await anunciosService.criar(req.body);
        res.status(201).json(novoAnuncio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar anúncio.'});
    }
};

exports.obterAnuncio = async (req, res) => {
    const { id } = req.params;
    try {
        const anuncio = await anunciosService.obterPorId(id);
        if (anuncio) {
            res.json(anuncio);
        } else {
            res.status(404).json({ message: 'Anúncio não encontrado.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter anúncio.'});
    }
};

// outras funcoes para criar, atualizar, deletar anuncios