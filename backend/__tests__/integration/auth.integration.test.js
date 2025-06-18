const request = require('supertest');
const app = require('../../src/app');   // Importa a aplicação Express.
const { pool } = require('../../src/database/db');  // Importa a conexão com o banco.
const argon2 = require('argon2');

describe('Autenticação - Teste de Integração (/api/auth)', () => {

    // Antes de todos os testes, limpa o banco para garantir um estado limpo.
    beforeAll(async () => {
        // TRUNCATE remove todas as linhas de uma tabela rapidamente.
        // RESTART IDENTITY reseta os contadores de ID (SERIAL).
        // CASCADE remove dependências em outras tabelas (foreign keys).
        await pool.query('TRUNCATE TABLE usuarios RESTART IDENTITY CASCADE');
    });

    // Depois de todos os testes, fecha a conexão com o banco.
    afterAll(async () => {
        await pool.end();
    });

    describe('POST /login', () => {
        // Antes de cada teste de login, cria um usuário de teste no banco.
        beforeEach(async () => {
            await pool.query('TRUNCATE TABLE usuarios RESTART IDENTITY CASCADE');   // Limpa antes de cada "it".
            const testeSenhaHash = await argon2.hash('senha_super_forte');
            await pool.query(
                "INSERT INTO usuarios (nome_usuario, email_usuario, senha_hash, primeiro_nome, ultimo_nome) VALUES ($1, $2, $3, $4, $5)",
                ['UsuarioDeTeste', 'teste@email.com', testeSenhaHash, 'Maximus', 'Testus']
            );
        });

        it('deve retornar status 200 e um accessToken para credenciais corretas', async () => {
            // Ação. Faz a requisição HTTP para o endpoint de login.
            const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'teste@email.com',
                senha: 'senha_super_forte'
            });

            // Verificação. Verifica a resposta.
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('accessToken');
            expect(response.body.accessToken).toBeDefined();
        });

        it('deve retornar status 401 para senha incorreta', async () => {
            const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'teste@email.com',
                senha: 'senha_errada'
            });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Credenciais inválidas.');
        });

        it('deve retornar status 401 para um email que não existe', async () => {
            const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'naoexiste@email.com',
                senha: 'qualquer_senha'
            });

            expect(response.status).toBe(401);
        });

        it('deve retornar status 400 se o campo de email estiver faltando', async () => {
            const response = await request(app)
            .post('/api/auth/login')
            .send({
                // Email ausente :(
                senha: 'senha_super_forte'
            });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Email e senha são obrigatórios.')
        });
    });
});