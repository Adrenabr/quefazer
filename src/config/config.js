require('dotenv').condig();

module.exports = {
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.PORT || '5432'),
    },
    port: parseInt(process.env.PORT || '3000'),
    // outras configuracoes aqui
};