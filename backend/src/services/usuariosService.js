const Usuario = require('../models/usuario');
const argon2 = require('argon2');

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