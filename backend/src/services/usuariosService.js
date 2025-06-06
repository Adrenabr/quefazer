const Usuario = require('../models/usuario');
const argon2 = require('argon2');
/*
const listarUsuariosComFiltros = async (filtros) => {
    // Lógica de negócios para aplicar filtros.
    // Pode envolver múltiplas chamadas ao model ou lógica adicional.
    return await Usuario.getAllUsuarios(filtros);
};

const cadastrarUsuarioComValidacao = async (usuarioData, email) => {
    // Lógica de negócios para validar os dados do usuario.    
};

const atualizarUsuario = async (id, usuarioData) => {
    // Lógica de negócios para atualização (validação, permissões, etc.)
    return await Usuario.updateUsuario(id, usuarioData);
};

const atualizarSenhaDoUsuario = async (userId, senhaAtual, novaSenha) => {
    const usuario = await Usuario.getUsuarioById(userId);
    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    const senhaCorreta = await argon2.verify(senhaAtual, usuario.senha_hash);
    if (!senhaCorreta) {
        throw new Error('Senha atual incorreta.');
    }

    const novaSenhaHash = await argon2.hash(novaSenha);
    const usuarioAtualizado = await Usuario.updateUsuario(userId, { senha_hash: novaSenhaHash });
    return usuarioAtualizado;
};
*/
exports.cadastrarUsuario = async (cadastroUsuario, cadastroEmail, cadastroSenha, primeiroNome, ultimoNome) => {
    try {
        // Verificar se o nome de usuário já existe.
        const nomeUsuarioExistente = await Usuario.getUserByUsername(cadastroUsuario);
        if (nomeUsuarioExistente) {
            throw new Error('Este nome de usuário já está em uso.');
        }
        // Verificar se o email já existe.
        const emailExistente = await Usuario.getUserByEmail(cadastroEmail);
        if (emailExistente) {
            throw new Error('Este email já está cadastrado.');
        }

        // Criptografar a senha.
        const senha_hash = await argon2.hash(cadastroSenha);

        // Criar um novo usuário usando o model.
        const novoUsuario = await Usuario.createUser({ cadastroUsuario, cadastroEmail, cadastroSenha: senha_hash, primeiroNome, ultimoNome});
        return novoUsuario;
    } catch (error) {
        console.error('Erro no serviço de cadastro:', error);
        throw error;    // Envia o erro para o controller lidar com a resposta.
    }
};

// Outras funções de serviço para lógica de negócios mais complexa
// ... outras funções para criar, atualizar, deletar
/*
module.exports = {
    listarUsuariosComFiltros,
    cadastrarUsuarioComValidacao,
    atualizarUsuario,
    atualizarSenhaDoUsuario
    // ... outras funções de serviço
};*/