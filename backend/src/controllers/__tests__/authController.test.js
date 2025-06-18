const authController = require('../authController');
const authService = require('../../services/authService');

// Mock do service para não testar sua lógica aqui.
jest.mock('../../services/authService');

describe('Auth Controller', () => {
    let mockRequest;
    let mockResponse;

    // Cria objetos req e res falsos antes de cada teste.
    beforeEach(() => {
        jest.clearAllMocks();
        mockRequest = {
            body: {
                email: 'teste@email.com',
                senha: 'senha123',
            },
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(), // .mockReturnThis() permite encadear chamadas como res.status(200).json(...)
            json: jest.fn(),
        };
    });
    it('deve retornar status 200 e um token em caso de sucesso', async () => {
        // Organização.
        const mockToken = 'token.jwt.falso';
        authService.login.mockResolvedValue(mockToken);

        // Ação.
        await authController.handleLogin(mockRequest, mockResponse);

        // Verificação.
        expect(authService.login).toHaveBeenCalledWith('teste@email.com', 'senha123');
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ accessToken: mockToken });
    });
    it('deve retornar status 401 se o service lançar erro de credenciais', async () => {
        // Organização.
        authService.login.mockRejectedValue(new Error('Credenciais inválidas.'));

        // Ação.
        await authController.handleLogin(mockRequest, mockResponse);

        // Verificação.
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Credenciais inválidas.'});
    });
    it('deve retornar status 400 se o email ou senha estiverem ausentes', async () => {
        // Organização.
        mockRequest.body.senha = '';    // Simula um campo ausente.

        // Ação.
        await authController.handleLogin(mockRequest, mockResponse);

        // Verificação.
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email e senha são obrigatórios.'});
        expect(authService.login).not.toHaveBeenCalled();   // O service não deve ser chamado.
    });
    it('deve retornar status 500 para erros inesperados do service', async () => {
        // Organização.
        authService.login.mockRejectedValue(new Error('Erro de banco de dados!'));

        // Ação.
        await authController.handleLogin(mockRequest, mockResponse);

        // Verificação.
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Ocorreu um erro interno.'});
    });
});