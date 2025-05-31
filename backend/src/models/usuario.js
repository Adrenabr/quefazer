const pool = require('../database/db'); //Esta linha importa a instância do Pool de conexão com o banco de dados
const argon2 = require('argon2');   // Importa biblioteca argon2.
// Ao tratar do banco de dados utilizar termos iniciais em ingles*

// Busca por todos os usuários no banco de dados
const getAllUsuarios = async () => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar todos os usuários:', error);
        throw error;    // Rejeitar o erro para ser tratado no controlador
    }
};

// Busca um usuário pelo ID
const getUsuarioById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE usuario_id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error(`Erro ao buscar usuário com ID ${id}:`, error);
        throw error;
    }
};

// Cria um usuário, falta verificar a questao do hash da senha***
const createUsuario = async (usuarioData) => {
    const { nome_usuario, senha, email_usuario } = usuarioData; // Senha vem do cliente
    try {
        const senha_hash = await argon2.hash(senha);    // Gera o hash usando argon2 (com configurações padrão).
        const query = `
        INSERT INTO usuarios (nome_usuario, senha_hash, email_usuario)
        VALUES ($1, $2, $3)
        RETURNING *;
        `;
        const values = [nome_usuario, senha_hash, email_usuario];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
};

// Atualiza os dados de um usuário existente.
const updateUsuario = async (id, usuarioData) => {
    const { nome_usuario, senha, email_usuario } = usuarioData;
    let query = 'UPDATE usuarios SET nome_usuario = $1, email_usuario = $2';
    const values = [nome_usuario, email_usuario];
    let valueIndex = 3;

    if (senha) {
        try {
            const senha_hash = await argon2.hash(senha);
            query += `, senha_hash = $${valueIndex}`;
            values.push(senha_hash);
            valueIndex++;
        } catch (error) {
            console.error('Erro ao gerar hash da nova senha:', error);
            throw error; // Importante tratar erros ao gerar o hash
        }
    }

    query += ` WHERE usuario_id = $${valueIndex} RETURNING *`;
    values.push(id);

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
        throw error;
    }
};

// Funções para atualizar e deletar clientes seguiriam um padrão similar

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario
    // ... outras funções
};