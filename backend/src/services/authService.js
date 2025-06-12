const Usuario = require('../models/usuario');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const authService = {
    async login(email, senha) {
        // Chama o model para buscar o usuario pelo email.
        const user = await Usuario.getUserByEmail(email);

        if (!user) {
            // Lança um erro que o controller irá capturar.
            throw new Error('Credenciais inválidas.');
        }

        // Verifica a senha.
        const isPasswordValid = await argon2.verify(user.senha_hash, senha);

        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas.');
        }

        // Gera o token.
        const accessToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        // Retorna o token para o controller.
        return accessToken;
    }
};

module.exports = authService;