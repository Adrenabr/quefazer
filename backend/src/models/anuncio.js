const pool = require('../database/db');//Esta linha importa a instância do Pool de conexão com o banco de dados
// Ao tratar do banco de dados utilizar termos iniciais em ingles*
// Busca por TODOS os anuncios no banco de dados.
const getAllAnuncios = async () => {
    try {
        const result = await pool.query('SELECT * FROM anuncios');
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar todos os anúncios:', error);
        throw error;    // Rejeitar o erro para ser tratado no controlador
    }
};
// Busca um anuncio pelo ID.
const getAnuncioById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM anuncios WHERE anuncio_id = $1', [id]);
        return result.rows[0]; // Retorna o primeiro resultado ou undefined
    } catch (error) {
        console.error(`Erro ao buscar anúncio com ID ${id}:`, error);
        throw error;
    }
};
// Cria um anuncio, falta verificar as permissões de logado e middlewares***
const createAnuncio = async (anuncioData) => {
    const { anunciante_id, categoria_id, titulo_anuncio, descricao, preco, localizacao } = anuncioData;
    const query = `
        INSERT INTO anuncios (anunciante_id, categoria_id, titulo_anuncio, descricao, preco, localizacao)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [anunciante_id, categoria_id, titulo_anuncio, descricao, preco, localizacao];
    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Retorna o anúncio criado
    } catch (error) {
        console.error('Erro ao criar o anúncio:', error);
        throw error;
    }
};

// ... outras funções para atualizar, deletar anúncios, etc.

module.exports = {
    getAllAnuncios,
    getAnuncioById,
    createAnuncio,
    // ... outras funções exportadas
};