const Anuncio = require('../models/anuncio'); // Importa o model de Anuncio

// Função para listar todos os anúncios
const listarAnuncios = async (req, res) => {
    try {
        const anuncios = await Anuncio.getAllAnuncios();
        res.status(200).json(anuncios);
    } catch (error) {
        console.error('Erro ao listar anúncios:', error);
        res.status(500).json({ error: 'Erro ao buscar anúncios' });
    }
};

// Função para obter um anúncio por ID
const obterAnuncioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const anuncio = await Anuncio.getAnuncioById(id);
        if (anuncio) {
            res.status(200).json(anuncio);
        } else {
            res.status(404).json({ message: 'Anúncio não encontrado' });
        }
    } catch (error) {
        console.error(`Erro ao buscar anúncio com ID ${id}:`, error);
        res.status(500).json({ error: 'Erro ao buscar anúncio' });
    }
};

// Função para criar um novo anúncio
const criarAnuncio = async (req, res) => {
    const anuncioData = req.body;
    try {
        const novoAnuncio = await Anuncio.createAnuncio(anuncioData);
        res.status(201).json(novoAnuncio);
    } catch (error) {
        console.error('Erro ao criar anúncio:', error);
        res.status(500).json({ error: 'Erro ao criar anúncio' });
    }
};

// Função para atualizar um anúncio existente
const atualizarAnuncio = async (req, res) => {
    const { id } = req.params;
    const anuncioData = req.body;
    try {
        const anuncioAtualizado = await Anuncio.updateAnuncio(id, anuncioData);
        if (anuncioAtualizado) {
            res.status(200).json(anuncioAtualizado);
        } else {
            res.status(404).json({ message: 'Anúncio não encontrado' });
        }
    } catch (error) {
        console.error(`Erro ao atualizar anúncio com ID ${id}:`, error);
        res.status(500).json({ error: 'Erro ao atualizar anúncio' });
    }
};

// Função para excluir um anúncio
const excluirAnuncio = async (req, res) => {
    const { id } = req.params;
    try {
        const sucesso = await Anuncio.deleteAnuncio(id);
        if (sucesso) {
            res.status(204).send(); // 204 No Content para exclusão bem-sucedida
        } else {
            res.status(404).json({ message: 'Anúncio não encontrado' });
        }
    } catch (error) {
        console.error(`Erro ao excluir anúncio com ID ${id}:`, error);
        res.status(500).json({ error: 'Erro ao excluir anúncio' });
    }
};

module.exports = {
    listarAnuncios,
    obterAnuncioPorId,
    criarAnuncio,
    atualizarAnuncio,
    excluirAnuncio,
};