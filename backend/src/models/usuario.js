const { pool } = require('../database/db'); // Importa a conexão com o PostgreSQL.
const argon2 = require('argon2');   // Importa biblioteca argon2.
// Ao tratar do banco de dados utilizar termos em ingles*

class Usuario {
    static async getUserByUsername(username) {
        try {
            const result = await pool.query('SELECT * FROM usuarios WHERE nome_usuario = $1', [username]);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao buscar usuário pelo username(model):', error);
            throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
            const result = await pool.query('SELECT * FROM usuarios WHERE email_usuario = $1', [email]);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao buscar usuário por email(model):', error);
            throw error;
        }
    }

    static async createUser(usuarioData) {
        const { cadastroUsuario, cadastroEmail, cadastroSenha, primeiroNome, ultimoNome } = usuarioData;
        try {
            const result = await pool.query(
                'INSERT INTO usuarios (nome_usuario, email_usuario, senha_hash, primeiro_nome, ultimo_nome) VALUES ($1, $2, $3, $4, $5) RETURNING usuario_id, nome_usuario, email_usuario, primeiro_nome, ultimo_nome',
                [cadastroUsuario, cadastroEmail, cadastroSenha, primeiroNome, ultimoNome]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao cadastrar usuário.', error);
            throw error;
        }
    }
    // Outras funções abaixo.
}
/*
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
// Busca um usuário pelo Email
const getUsuarioByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email_usuario = $1', [email]);
        return result.rows[0];
    } catch (error) {
        console.error(`Erro ao buscar usuário pelo Email ${email}`);
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
*/
// Funções para atualizar e deletar clientes seguiriam um padrão similar
module.exports = Usuario;
/*
module.exports = {
    getAllUsuarios,
    getUsuarioById,
    //getUsuarioByEmail,
    createUsuario,
    updateUsuario
    // ... outras funções
};*/