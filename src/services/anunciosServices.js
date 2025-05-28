const { pool } = require('../database/db'); // LEMBRAR DE CONFIGURAR O POSTGRESQL!!!!!!!!!!*

exports.listarTodos = async () => {
    const { rows } = await pool.query('SELECT * FROM anuncios');    // analisar sobrecarga no bd
    return rows;
};

exports.criar = async (anuncio) => {
    const { usuario_id, categoria_id, titulo_anuncio, descricao, preco, localizacao, destaque } = anuncio;
    const query = `
    INSERT INTO anuncios (usuario_id, categoria_id, titulo_anuncio, descricao, preco, localizacao, destaque)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `;
    const values = [usuario_id, categoria_id, titulo_anuncio, descricao, preco, localizacao, destaque];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

exports.obterPorId = async (id) => {
    const { rows } = await pool.query('SELECT * FROM anuncios WHERE anuncio_id = $1', [id]);
    return rows[0];
};

// ... outras funções para criar, atualizar, deletar anúncios