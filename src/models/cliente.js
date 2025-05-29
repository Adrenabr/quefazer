const pool = require('../database/db');//ISSO E UM PROTOTIPO

const getAllClientes = async () => {
    try {
        const result = await pool.query('SELECT * FROM clientes');
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar todos os clientes:', error);
        throw error;
    }
};

const getClienteById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM clientes WHERE cliente_id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error(`Erro ao buscar cliente com ID ${id}:`, error);
        throw error;
    }
};

const createCliente = async (clienteData) => {//ISSO E UM PROTOTIPO
    const { nome_cliente, email_cliente, tipo_cliente, cpf, cnpj, /* ... outras colunas ... */ } = clienteData;
    const query = `
        INSERT INTO clientes (nome_cliente, email_cliente, tipo_cliente, cpf, cnpj, /* ... outras colunas ... */)
        VALUES ($1, $2, $3, $4, $5, /* ... outros placeholders ... */)
        RETURNING *;
    `;
    const values = [nome_cliente, email_cliente, tipo_cliente, cpf, cnpj, /* ... outros valores ... */];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        throw error;
    }
};

// Funções para atualizar e deletar clientes seguiriam um padrão similar

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    // ... outras funções
};