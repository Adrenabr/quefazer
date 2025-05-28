// arquivo para iniciar o servidor, no caso esta importando e executando o app.js
const app = require('./app');
const config = require('./config/config'); // Importa o arquivo de configuração
const { connect } = require('./database/db') // Função para conectar ao banco

const port = config.port;

// Iniciar o servidor
connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados: ', err);
        process.exit(1);    // Encerra o processo em caso de falha na conexão
    });