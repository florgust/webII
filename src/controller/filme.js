const { FilmeService } = require('../service/filme');
const { FilmeSchema, FilmeUpdateSchema } = require('../validation/filmeValidation')

const getFilmesDesativados = async (req, res, next) => {
    console.log('GET /filmes - Iniciando busca de todos os filmes desativados');
    try {
        const filmes = await FilmeService.getFilmesDesativados();
        console.log('GET /filmes - Filmes encontrados:', filmes);
        res.json(filmes);
    } catch (error) {
        console.error('GET /filmes - Erro ao buscar filmes:', error);
        next(error);
    }
};

const getFilmes = async (req, res, next) => {
    console.log('GET /filmes - Iniciando busca de todos os filmes');
    try {
        const filmes = await FilmeService.getFilmes();
        console.log('GET /filmes - Filmes encontrados:', filmes);
        res.json(filmes);
    } catch (error) {
        console.error('GET /filmes - Erro ao buscar filmes:', error);
        next(error);
    }
};

const getFilmeById = async (req, res, next) => {
    const { id } = req.params;
    console.log(`GET /filmes/${id} - Iniciando busca do filme com ID ${id}`);
    try {
        const filme = await FilmeService.getFilmeById(id);
        console.log(`GET /filmes/${id} - Filme encontrado:`, filme);
        res.json(filme);
    } catch (error) {
        console.error(`GET /filmes/${id} - Erro ao buscar filme:`, error);
        next(error);
    }
};

const getFilmesByNome = async (req, res, next) => {
    const { nome } = req.params;
    console.log(`GET /filmes/buscar - Iniciando busca de filmes com nome: ${nome}`);
    try {
        const filmes = await FilmeService.getFilmesByNome(nome);
        console.log(`GET /filmes/buscar - Filmes encontrados:`, filmes);
        res.json(filmes);
    } catch (error) {
        console.error(`GET /filmes/buscar - Erro ao buscar filmes:`, error);
        next(error);
    }
}

const createFilme = async (req, res, next) => {
    console.log('POST /filmes - Dados recebidos para criação:', req.body);
    try {
        const validetData = FilmeSchema.parse(req.body)
        const novoFilme = await FilmeService.createFilme(validetData);
        console.log('POST /filmes - Filme criado com sucesso:', novoFilme);
        res.status(201).json(novoFilme);
    } catch (error) {
        console.error('POST /filmes - Erro ao criar filme:', error);
        next(error);
    }
};

const updateFilme = async (req, res, next) => {
    const { id } = req.params;
    console.log(`PUT /filmes/${id} - Dados recebidos para atualização:`, req.body);
    try {
        const validetData = FilmeUpdateSchema.parse(req.body)
        const filmeAtualizado = await FilmeService.updateFilme(id, validetData);
        console.log(`PUT /filmes/${id} - Filme atualizado com sucesso:`, filmeAtualizado);
        res.json(filmeAtualizado);
    } catch (error) {
        console.error(`PUT /filmes/${id} - Erro ao atualizar filme:`, error);
        next(error);
    }
};

const softDeleteFilme = async (req, res, next) => {
    const { id } = req.params;
    console.log(`SOFT DELETE /filmes/${id} - Iniciando exclusão lógica do filme com ID ${id}`);
    try {
        const filmeDeletado = await FilmeService.softDeleteFilme(id);
        console.log(`SOFT DELETE /filmes/${id} - Filme excluído logicamente com sucesso:`, filmeDeletado);
        res.json(filmeDeletado);
    } catch (error) {
        console.error(`SOFT DELETE /filmes/${id} - Erro ao excluir filme:`, error);
        next(error);
    }
};
module.exports = { getFilmesDesativados, getFilmes, getFilmeById, getFilmesByNome, createFilme, updateFilme, softDeleteFilme };