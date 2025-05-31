const { Pool } = require('pg');
const config = require('../config/config');

const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
});

// Testar a conexão
pool.connect()
    .then(() => {
        console.log('Conectado ao banco de dados PostgreSQL com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados PostgreSQL:', err);
    });

module.exports = pool;