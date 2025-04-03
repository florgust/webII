const { UsuarioService } = require('../service/usuario')

const getUsuarios = async (req, res, next) => {
    try {
        const usuarios = await UsuarioService.getUsuarios();
        res.json(usuarios);
    } catch (error) {
        next(error); // Encaminha o erro para o middleware de erros
    }
}

const getUsuarioById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await UsuarioService.getUsuarioById(id);
        res.json(usuario);
    } catch (error) {
        next(error); // Encaminha o erro para o middleware de erros
    }
};

const createUsuario = async (req, res, next) => {
    try {
        const novoUsuario = await UsuarioService.createUsuario(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        next(error); // Encaminha o erro para o middleware de erros
    }
};

const updateUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUsuario = await UsuarioService.updateUsuario(id, req.body);
        res.json(updatedUsuario);
    } catch (error) {
        next(error); // Encaminha o erro para o middleware de erros
    }
};

// delete logico
const softDeleteUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUsuario = await UsuarioService.softDeleteUsuario(id);
        res.json(updatedUsuario);
    } catch (error) {
        next(error); // Encaminha o erro para o middleware de erros
    }
};

module.exports = { getUsuarios, createUsuario, getUsuarioById, updateUsuario, softDeleteUsuario };