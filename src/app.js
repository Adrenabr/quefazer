const express = require('express');
const app = express();
const port = process.env.PORT || 3000;  //porta definida para o ambiente, porem deixei 3000 por padrao

// middleware para analisar o corpo das requisicoes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// abaixo onde adiciona rotas da aplicacao

// middleware para tratamento de erros*
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;   // exporta o app para testes ou outros modulos