const { Pool } = require('pg'); // Importa a classe Pool do 'pg'.
const config = require('../config/config'); // Configurações de DB estão em config.js.

const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
});

// Testar a conexão
pool.on('error', (err) => {
    console.error('Erro inesperado no pool do banco de dados:', err);
    process.exit(-1);   // Encerrar o processo se houver um erro grave de conexão.
});

module.exports = { pool };
/*
pool.connect()
    .then(() => {
        console.log('Conectado ao banco de dados PostgreSQL com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados PostgreSQL:', err);
    });

module.exports = pool;
*/