const { FilmeService } = require('../service/filme');

const getFilmes = async (req, res, next) => {
    try {
        const filmes = await FilmeService.getFilmes();
        res.json(filmes);
    } catch (error) {
        next(error); // Encaminha o erro para o middleware de erros
    }
};

const getFilmeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const filme = await FilmeService.getFilmeById(id);
        res.json(filme);
    } catch (error) {
        next(error); // Encaminha o erro para o middleware de erros
    }
};

const createFilme = async (req, res, next) => {
    try {
        const novoFilme = await FilmeService.createFilme(req.body);
        res.status(201).json(novoFilme);
    } catch (error) {
        next(error); // Encaminha o erro para o middleware de erros
    }
};

const updateFilme = async (req, res, next) => {
    try {
        const { id } = req.params;
        const filmeAtualizado = await FilmeService.updateFilme(id, req.body);
        res.json(filmeAtualizado);
    } catch (error) {
        next(error); // Encaminha o erro para o middleware de erros
    }
};

const deleteFilme = async (req, res, next) => {
    try {
        const { id } = req.params;
        const filmeDeletado = await FilmeService.deleteFilme(id);
        res.json(filmeDeletado);
    } catch (error) {
        next(error); // Encaminha o erro para o middleware de erros
    }
};

module.exports = { getFilmes, getFilmeById, createFilme, updateFilme, deleteFilme };