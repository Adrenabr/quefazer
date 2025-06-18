const authService = require('../authService');
const Usuario = require('../../models/usuario');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Mock das dependências externas.
// Informa o jest para substituir os módulos reais por versões falsas.
jest.mock('../../models/usuario');
jest.mock('argon2');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {
    // Limpa TODOS os mocks antes de cada teste para garantir que um teste não interfira no outro.
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Teste do caminho feliz :D
    it('deve retornar um accessToken quando as credenciais forem válidas', async () => {
        // Organização.
        const mockUser = { id: 1, email: 'teste@email.com', senha_hash: 'hash_secreta' };
        const mockToken = 'token.jwt.falso';

        // Configuração do comportamento dos mocks.
        Usuario.getUserByEmail.mockResolvedValue(mockUser); // Simula encontrar um usuário.
        argon2.verify.mockResolvedValue(true);  // Simula que a senha está correta.
        jwt.sign.mockReturnValue(mockToken);    // Simula a geração do token.

        // Ação.
        const token = await authService.login('teste@email.com', 'senha123');

        // Verificação.
        expect(token).toBe(mockToken);
        expect(Usuario.getUserByEmail).toHaveBeenCalledWith('teste@email.com');
        expect(argon2.verify).toHaveBeenCalledWith('hash_secreta', 'senha123');
        expect(jwt.sign).toHaveBeenCalledWith(
            { userId: mockUser.id, email: mockUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
    });
    it('deve lançar um erro se o usuário não for encontrado', async () => {
        // Organização.
        Usuario.getUserByEmail.mockResolvedValue(null); // Simula não encontrar o usuário.

        // Ação e Verificação.
        // Verifica se a função lança um erro com a mensagem esperada.
        await expect(authService.login('naoexiste@email.com', 'senha123'))
        .rejects.toThrow('Credenciais inválidas.');

        // Garantir que a verificação de senha nunca foi chamada.
        expect(argon2.verify).not.toHaveBeenCalled();
    });
    it('deve lançar um erro se a senha for inválida', async () => {
        // Organização.
        const mockUser = { id: 1, email: 'teste@email.com', senha_hash: 'hash_secreta' };
        Usuario.getUserByEmail.mockResolvedValue(mockUser);
        argon2.verify.mockResolvedValue(false); // Simula que a senha está INCORRETA.

        // Ação e Verificação.
        await expect(authService.login('teste@email.com', 'senha_errada'))
        .rejects.toThrow('Credenciais inválidas.');

        expect(jwt.sign).not.toHaveBeenCalled();// O token não deve ser gerado.
    });
});