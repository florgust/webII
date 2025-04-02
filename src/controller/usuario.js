const { Request, Response } = require('express')
const { UsuarioService } = require('../service/usuario')

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioService.getUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await UsuarioService.getUsuarioById(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
};

const createUsuario = async (req, res) => {
    try {
        const novoUsuario = await UsuarioService.createUsuario(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar usuário.' });
    }
}

const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUsuario = await UsuarioService.updateUsuario(id, req.body);
        res.json(updatedUsuario);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar usuário.' });
    }
};

// delete logico
const softDeleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUsuario = await UsuarioService.softDeleteUsuario(id);
        res.json(updatedUsuario);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar usuário.' });
    }
};

module.exports = { getUsuarios, createUsuario, getUsuarioById, updateUsuario, softDeleteUsuario };