// arquivo para iniciar o servidor, no caso esta importando e executando o app.js
const app = require('./app');
const config = require('./config/config');  // Importa o arquivo de configuração
const { pool } = require('./database/db');      // Importa a instância do Pool

const port = config.port;

// Iniciar o servidor após conectar ao banco
pool.connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        }).on('error', (err) => {
            console.error('Erro ao iniciar o servidor: ', err);
            process.exit(1);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
        console.error('Configurações do banco de dados:', config.db); // Log das configurações (cuidado com senhas em produção)
        process.exit(1); // Encerra o processo em caso de falha na conexão
    });