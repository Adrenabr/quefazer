const authService = require('../services/authService');

const authController = {
    async handleLogin(req, res) {
        console.log('[CONTROLLER] Requisição de login recebida.');
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        try {
            console.log('[CONTROLLER] Chamando o authService...');
            // Chama o service para realizar o trabalho.
            const accessToken = await authService.login(email, senha);

            console.log('[CONTROLLER] Sucesso! Enviando token.');
            // Se o service retornou o token, envia a resposta de sucesso.
            return res.status(200).json({ accessToken });

        } catch (error) {
            console.error('[CONTROLLER] Erro capturado!', error);
            // Se o service lançou um erro (ex: credenciais inválidas), o controller captura.
            if (error.message === 'Credenciais inválidas.') {
                return res.status(401).json({ message: error.message});
            }
            // Para qualquer outro erro inesperado.
            return res.status(500).json({ message: 'Ocorreu um erro interno.' });
        }
    }
};

module.exports = authController;