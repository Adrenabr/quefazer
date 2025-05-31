const Anuncio = require('../models/anuncio'); // Importa o model.
const anunciosService = require('../services/anunciosService'); // Importa o service.

// Controlador para listar anúncios com suporte a filtros
const listarAnuncios = async (req, res) => {
    try {
        const filtros = req.query;              // Obtém os parâmetros de consulta da URL (ex: /anuncios?categoria=carros&preco_min=1000). Estes serão usados para filtrar os anúncios.
        const anuncios = await anunciosService.listarAnunciosComFiltros(filtros); // Chama a função no 'anunciosService' para buscar os anúncios aplicando os filtros recebidos. 'await' indica que esta é uma operação assíncrona.
        res.status(200).json(anuncios);         // Responde com um status HTTP 200 (OK) e envia os anúncios encontrados no formato JSON.
    } catch (error) {
        console.error('Erro ao listar anúncios:', error); // Registra o erro no console para depuração.
        res.status(500).json({ error: error.message || 'Erro ao buscar anúncios' }); // Responde com um status HTTP 500 (Internal Server Error) e uma mensagem de erro, pegando a mensagem específica do erro ou uma mensagem genérica.
    }
};

// Controlador para obter um anúncio específico pelo seu ID
const obterAnuncioPorId = async (req, res) => {
    const { id } = req.params;  // Extrai o parâmetro 'id' da URL (ex: /anuncios/123, onde 123 seria o ID).
    try {
        const anuncio = await Anuncio.getAnuncioById(id); // Chama a função no model 'Anuncio' para buscar um anúncio pelo seu ID.
        if (anuncio) {
            res.status(200).json(anuncio);      // Se o anúncio for encontrado, responde com status 200 e o anúncio em JSON.
        } else {
            res.status(404).json({ message: 'Anúncio não encontrado' }); // Se o anúncio não for encontrado, responde com status 404 (Not Found) e uma mensagem.
        }
    } catch (error) {
        console.error(`Erro ao buscar anúncio com ID ${id}:`, error); // Registra o erro no console, incluindo o ID que estava sendo buscado.
        res.status(500).json({ error: 'Erro ao buscar anúncio' }); // Responde com status 500 e uma mensagem de erro genérica.
    }
};

// Controlador para criar um novo anúncio
const criarAnuncio = async (req, res) => {
    const anuncioData = req.body; // Obtém os dados do novo anúncio do corpo da requisição (geralmente em formato JSON).
    const usuarioLogado = req.usuario; // Supondo que você tem um middleware de autenticação que adiciona informações do usuário logado na requisição.

    try {
        const novoAnuncio = await anunciosService.criarAnuncioComValidacao(anuncioData, usuarioLogado); // Chama a função no 'anunciosService' para criar um novo anúncio, possivelmente realizando validações nos dados.
        res.status(201).json(novoAnuncio); // Responde com status 201 (Created) e o novo anúncio criado em JSON.
    } catch (error) {
        console.error('Erro ao criar anúncio:', error); // Registra o erro no console.
        res.status(400).json({ error: error.message }); // Responde com status 400 (Bad Request) e a mensagem de erro, geralmente indicando um problema com os dados da requisição (validação falhou).
    }
};

// Controlador para atualizar um anúncio existente
const atualizarAnuncio = async (req, res) => {
    const { id } = req.params; // Extrai o ID do anúncio a ser atualizado da URL.
    const anuncioData = req.body; // Obtém os dados atualizados do anúncio do corpo da requisição.
    try {
        const anuncioAtualizado = await Anuncio.updateAnuncio(id, anuncioData); // Chama a função no model 'Anuncio' para atualizar o anúncio com o ID e os novos dados.
        if (anuncioAtualizado) {
            res.status(200).json(anuncioAtualizado); // Se a atualização for bem-sucedida, responde com status 200 e o anúncio atualizado em JSON.
        } else {
            res.status(404).json({ message: 'Anúncio não encontrado' }); // Se o anúncio com o ID fornecido não for encontrado, responde com status 404.
        }
    } catch (error) {
        console.error(`Erro ao atualizar anúncio com ID ${id}:`, error); // Registra o erro no console, incluindo o ID.
        res.status(500).json({ error: 'Erro ao atualizar anúncio' }); // Responde com status 500 e uma mensagem de erro genérica.
    }
};

// Controlador para excluir um anúncio
const excluirAnuncio = async (req, res) => {
    const { id } = req.params; // Extrai o ID do anúncio a ser excluído da URL.
    try {
        const sucesso = await Anuncio.deleteAnuncio(id); // Chama a função no model 'Anuncio' para excluir o anúncio pelo seu ID.
        if (sucesso) {
            res.status(204).send(); // Se a exclusão for bem-sucedida, responde com status 204 (No Content), indicando que a requisição foi bem-sucedida, mas não há conteúdo para retornar.
        } else {
            res.status(404).json({ message: 'Anúncio não encontrado' }); // Se o anúncio com o ID fornecido não for encontrado, responde com status 404.
        }
    } catch (error) {
        console.error(`Erro ao excluir anúncio com ID ${id}:`, error); // Registra o erro no console, incluindo o ID.
        res.status(500).json({ error: 'Erro ao excluir anúncio' }); // Responde com status 500 e uma mensagem de erro genérica.
    }
};

// Exporta as funções do controlador para que possam ser usadas em outros arquivos (como rotas).
module.exports = {
    listarAnuncios,
    obterAnuncioPorId,
    criarAnuncio,
    atualizarAnuncio,
    excluirAnuncio,
};