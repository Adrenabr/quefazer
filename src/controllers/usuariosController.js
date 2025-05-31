const Usuario = require('../models/usuario');    // Importa o model.
const usuariosService = require('../services/usuariosService'); // Importa o service.

// Controlador para listar usuários com suporte a filtros.
const listarUsuarios = async (req, res) => {
    try {
        const filtros = req.query;  // Obtém os parâmetros de consulta da URL (ex: /usuarios?). Estes serão usados para filtrar os usuarios.
        const usuarios = await usuariosService.listarUsuariosComFiltros(filtros);   // Chama a função no 'usuariosService' para buscar os usuarios. 'await' indica que esta é uma operação assíncrona.
        res.status(200).json(usuarios); // Responde com um status HTTP 200 (OK) e envia os usuarios encontrados no formato JSON.
    } catch (error) {
        console.error('Erro ao listar usuários:', error); // Registra o erro no console para depuração.
        res.status(500).json({ error: error.message || 'Erro ao buscar usuários.'});    // Responde com um status HTTP 500 (Internal Server Error) e uma mensagem de erro, pegando a mensagem específica do erro ou uma mensagem genérica.
    }
};

// Controlador para obter um usuário específico pelo ID.
const obterUsuarioPorId = async (req, res) => {
    const { id } = req.params;  // Extrai o parâmetro 'id' da URL.
    try {
        const usuario = await Usuario.getUsuarioById(id);   // Chama a função no model 'Usuario' para buscar um usuario pelo seu ID.
        if (usuario) {
            res.status(200).json(usuario);  // Se o usuario for encontrado, responde com status 200 e o usuario em JSON.
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' }); // Se o usuário não for encontrado, responde com status 404 (Not Found) e uma mensagem.
        }
    } catch (error) {
        console.error(`Erro ao buscar usuário com ID ${id}:`, error);   // Registra o erro no console, incluindo o ID que estava sendo buscado.
        res.status(500).json({ error: 'Erro ao buscar anúncio' });  // Responde com status 500 e uma mensagem de erro genérica.
    }
};

// Controlador para cadastrar um usuario.
const cadastrarUsuario = async (req, res) => {
    const usuarioData = req.body;   // Obtém os dados do novo usuario do corpo da requisição (geralmente em formato JSON).
    const usuarioLogado = req.usuario; // Tendo um middleware de autenticação que adiciona informações do usuário logado na requisição, importante que nenhum usuario logado possa registrar um novo usuario.
    try {
        const novoUsuario = await usuariosService.cadastrarUsuarioComValidacao(usuarioData, usuarioLogado); // Chama a função no 'usuariosService' para criar um novo usuario, possivelmente realizando validações nos dados.
        res.status(201).json(novoUsuario);  // Responde com status 201 (Created) e o novo usuario criado em JSON.
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error); // Registra o erro no console.
        res.status(400).json({ error: error.message }); // Responde com status 400 (Bad Request) e a mensagem de erro, geralmente indicando um problema com os dados da requisição (validação falhou).
    }
};

// Controlador para realizar login de usuario.
const loginUsuario = async (senha, senha_hash) => {
    try {
        return await argon2d.verify(senha, senha_hash); // Retorna true ou false
    } catch (error) {
        console.error('Erro ao verificar senha:', error);
        return false;   // modificar para lançar o erro
    }
};

// Controlador para atualizar dados de usuario.
const atualizarUsuario = async (req, res) => {
    const { id } = req.params;  // Extrai o ID do usuário a ser atualizado da URL.
    const usuarioData = req.body;   // Obtém os dados atualizados do usuário do corpo da requisição.
    try {
        const usuarioAtualizado = await Usuario.updateUsuario(id, usuarioData); // Chama a função no model 'Usuario' para atualizar o usuário com o ID e os novos dados.
        if (usuarioAtualizado) {
            res.status(200).json(usuarioAtualizado);    // Se a atualização for bem-sucedida, responde com status 200 e o usuário atualizado em JSON.
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });   // Se o usuário com o ID fornecido não for encontrado, responde com status 404.
        }
    } catch (error) {
        console.error(`Erro ao atualizar usuário com ID ${id}:`, error); // Registra o erro no console, incluindo o ID.
        res.status(500).json({ error: 'Erro ao atualizar usuário.' });  // Responde com status 500 e uma mensagem de erro genérica.
    }
};

// Controlador para excluir um usuário, não sei se será utilizado.*
const excluirUsuario = async (req, res) => {  };

module.exports = {
    listarUsuarios,
    obterUsuarioPorId,
    cadastrarUsuario,
    loginUsuario,
    atualizarUsuario,
    excluirUsuario,
};