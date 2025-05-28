const { pool } = require('pg');
const config = require('../config/config'); // criar arquivo de configuracao*

const pool = new pool ({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
});

pool.on('error', (err, client) => {
    console.error('Erro inesperado no cliente do pool', err);
    process.exit(-1);
});

module.export = { pool };