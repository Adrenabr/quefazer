const { Pool } = require('pg'); // Importa a classe Pool do 'pg'.
const config = require('../config/config'); // Configurações de DB estão em config.js.

const pool = new Pool({
    user: config.db.user,           // Acessa via confit.db
    host: config.db.host,           // Acessa via confit.db
    database: config.db.database,   // Acessa via confit.db
    password: config.db.password,   // Acessa via confit.db
    port: config.db.port,           // Acessa via confit.db
});

// Teste de conexão.
pool.on('error', (err) => {
    console.error('Erro inesperado no pool do banco de dados:', err);
    process.exit(-1);   // Encerrar o processo se houver um erro grave de conexão.
});

module.exports = { pool };