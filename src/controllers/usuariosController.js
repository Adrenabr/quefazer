const usuariosService = require('../services/usuariosService');

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosService.listarTodos();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar usuarios.'});
    }
};

exports.cadastrarUsuario = async (req, res) => {
    try {
        const novoUsuario = await usuariosService.criar(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar usuário.'});
    }
};

exports.obterUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuariosService.obterPorId(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter usuário.'});
    }
};

// refazer usuariosController e clientesController seguindo o padrao
/*
const Usuario = require('../models/usuario');

const listarUsuarios = async (req, res) => {  };
const obterUsuarioPorId = async (req, res) => {  };
const registrarUsuario = async (req, res) => {  };
const loginUsuario = async (req, res) => {  };
const atualizarUsuario = async (req, res) => {  };
const excluirUsuario = async (req, res) => {  };

module.exports = {
    listarUsuarios,
    obterUsuarioPorId,
    registrarUsuario,
    loginUsuario,
    atualizarUsuario,
    excluirUsuario,
};
*/