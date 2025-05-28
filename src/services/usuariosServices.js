const { pool } = require('../database/db');

exports.listarTodos = async () => {
    const { rows } = await pool.query('SELECT * FROM usuarios');    // analisar sobrecarga no bd
    return rows;
};

exports.criar = async (usuario) => {
    const { usuario_id, nome_usuario, senha_hash, email_usuario } = usuario;
    const query = `
    INSERT INTO anuncios (usuario_id, nome_usuario, senha_hash, email_usuario)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    const values = [usuario_id, nome_usuario, senha_hash, email_usuario];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

exports.obterPorId = async (id) => {
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE usuario_id = $1', [id]);
    return rows[0];
};

// ... outras funções para criar, atualizar, deletar anúncios