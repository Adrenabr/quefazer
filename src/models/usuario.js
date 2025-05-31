const pool = require('../database/db'); //Esta linha importa a instância do Pool de conexão com o banco de dados
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
    const { nome_usuario, senha_hash, email_usuario } = usuarioData; // No momento ta bem magro pra economizar tempo :D
    const query = `
        INSERT INTO usuarios (nome_usuario, senha_hash, email_usuario)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [nome_usuario, senha_hash, email_usuario];
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
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    // ... outras funções
};