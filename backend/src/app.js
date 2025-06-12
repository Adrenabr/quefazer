const express = require('express');
const config = require('./config/config');  // Importa o arquivo de configuração
const port = config.port;                   // Obtém a porta do arquivo de configuração
const cors = require('cors');               // Para habilitar CORS

const app = express();

// const authMiddleware = require('./middlewares/auth');
// const errorHandler = require('./middlewares/error');
// const validate = require('./middlewares/validate');

// Importar as rotas
const anunciosRoutes = require('./routes/anuncios.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const clientesRoutes = require('./routes/clientes.routes');
const authRoutes = require('./routes/auth.routes');

// Middleware de logging
//app.use(morgan('dev'));

// Middleware para segurança (configure conforme necessário)
//app.use(helmet());

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montar as rotas da aplicação
app.use('/api/anuncios', anunciosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/auth', authRoutes);

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