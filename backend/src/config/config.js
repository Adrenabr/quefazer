require('dotenv').config(); // Carrega as variaveis de ambiente do .env

const isTestEnvironment = process.env.NODE_ENV === 'test';

module.exports = {
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: isTestEnvironment ? 'meu_app_teste': process.env.DB_DATABASE, // Usa o banco de dados de teste enquanto estiver em ambiente de teste.
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432', 10), // Adicionada radix para consistência, pois variáveis do .env são lidas como strings.
    },
    port: parseInt(process.env.PORT || '3000', 10),
};