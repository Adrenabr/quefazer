const express = require('express');
const app = express();
const config = require('./config/config'); // Importa o arquivo de configuração
const port = config.port;   // Obtém a porta do arquivo de configuração

// Importar as rotas
const anunciosRoutes = require('./routes/anuncios.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const clientesRoutes = require('./routes/clientes.routes');

// Middleware para analisar o corpo das requisições (JSON e urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging ..* INATIVO *..
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Montar as rotas da aplicação
app.use('/api/anuncios', anunciosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clientes', clientesRoutes);

// Middleware para tratamento de erros (deve ser definido APÓS as rotas)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app; // Exportar o app para testes ou outros módulos