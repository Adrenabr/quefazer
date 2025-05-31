const pool = require('../database/db'); //Esta linha importa a instância do Pool de conexão com o banco de dados
// Ao tratar do banco de dados utilizar termos iniciais em ingles*
// Busca por TODOS os clientes no banco de dados.
const getAllClientes = async () => {
    try {
        const result = await pool.query('SELECT * FROM clientes');
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar todos os clientes:', error);
        throw error;    // Rejeitar o erro para ser tratado no controlador
    }
};
// Busca um cliente pelo ID.
const getClienteById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM clientes WHERE cliente_id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error(`Erro ao buscar cliente com ID ${id}:`, error);
        throw error;
    }
};
// Cria um cliente, verificar middlewares e regras de negócios*
const createCliente = async (clienteData) => {  // Alguns campos podem ser NULL, validar nas regras de negócios.
    const { nome_cliente, tipo_cliente, cpf, cnpj, data_nascimento, inscricao_estadual, razao_social, nome_fantasia, telefone, cep, endereco, complemento_endereco, bairro, cidade, estado, observacoes } = clienteData;    // cpf e cnpj podem ser NULL, mas a regras de negócios deve GARANTIR que UM seja preenchido.
    const query = `
        INSERT INTO clientes (nome_cliente, tipo_cliente, cpf, cnpj, data_nascimento, inscricao_estadual, razao_social, nome_fantasia, telefone, cep, endereco, complemento_endereco, bairro, cidade, estado, observacoes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *;
    `;
    const values = [nome_cliente, tipo_cliente, cpf, cnpj, data_nascimento, inscricao_estadual, razao_social, nome_fantasia, telefone, cep, endereco, complemento_endereco, bairro, cidade, estado, observacoes];
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