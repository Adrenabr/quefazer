require('dotenv').config(); // Carrega as variaveis de ambiente do .env

module.exports = {
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432', 10), // Adicionada radix para consistência, pois variáveis do .env são lidas como strings.
    },
    port: parseInt(process.env.PORT || '3000', 10),
};