const express = require('express');
const app = express();
const config = require('./config/config'); // Importa o arquivo de configuração
const port = config.port;   // Obtém a porta do arquivo de configuração
const morgan = require('morgan'); // Para logging de requisições
const helmet = require('helmet'); // Para segurança
const cors = require('cors');   // Para habilitar CORS (se necessário)

// Importar as rotas
const anunciosRoutes = require('./routes/anuncios.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const clientesRoutes = require('./routes/clientes.routes');

// Middleware de logging
app.use(morgan('dev'));

// Middleware para segurança (configure conforme necessário)
app.use(helmet());

// Middleware para habilitar CORS (configure conforme necessário)
app.use(cors());

// Middleware para analisar o corpo das requisições (JSON e urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montar as rotas da aplicação
app.use('/api/anuncios', anunciosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clientes', clientesRoutes);

// Middleware para tratamento de erros (deve ser definido APÓS as rotas)
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (process.env.NODE_ENV === 'development') {
        res.status(500).send(err.stack); // Envia o stack trace em desenvolvimento
    } else {
        res.status(500).send('Algo deu errado!'); // Mensagem genérica em produção
    }
});

module.exports = app; // Exportar o app para testes ou outros módulos