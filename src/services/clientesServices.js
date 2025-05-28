const { pool } = require('../database/db');

exports.listarTodos = async () => {
    const { rows } = await pool.query('SELECT * FROM clientes');    // analisar sobrecarga no bd
    return rows;
};

exports.criar = async (cliente) => {
    const { cliente_id, nome_cliente, email, tipo_cliente, cpf_cnpj, cep, endereco, bairro, cidade, estado } = cliente;
    const query = `
    INSERT INTO anuncios (cliente_id, nome_cliente, email, tipo_cliente, cpf_cnpj, cep, endereco, bairro, cidade, estado)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
    `;
    const values = [cliente_id, nome_cliente, email, tipo_cliente, cpf_cnpj, cep, endereco, bairro, cidade, estado];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

exports.obterPorId = async (id) => {
    const { rows } = await pool.query('SELECT * FROM clientes WHERE cliente_id = $1', [id]);
    return rows[0];
};

// ... outras funções para criar, atualizar, deletar