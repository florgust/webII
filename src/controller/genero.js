const { GeneroService } = require('../service/genero');
const { GeneroSchema, GeneroUpdateSchema } = require('../validation/generoValidation');

const getGeneros = async (req, res, next) => {
    console.log('GET /generos - Iniciando busca de todos os gêneros');
    try {
        const generos = await GeneroService.getGeneros();
        console.log('GET /generos - Gêneros encontrados:', generos);
        res.json(generos);
    } catch (error) {
        console.error('GET /generos - Erro ao buscar gêneros:', error);
        next(error);
    }
};

const getGeneroById = async (req, res, next) => {
    const { id } = req.params;
    console.log(`GET /generos/${id} - Iniciando busca do gênero com ID ${id}`);
    try {
        const genero = await GeneroService.getGeneroById(id);
        console.log(`GET /generos/${id} - Gênero encontrado:`, genero);
        res.json(genero);
    } catch (error) {
        console.error(`GET /generos/${id} - Erro ao buscar gênero:`, error);
        next(error);
    }
};

const createGenero = async (req, res, next) => {
    console.log('POST /generos - Dados recebidos para criação:', req.body);
    try {
        const validatedData = GeneroSchema.parse(req.body);
        const novoGenero = await GeneroService.createGenero(validatedData);
        console.log('POST /generos - Gênero criado com sucesso:', novoGenero);
        res.status(201).json(novoGenero);
    } catch (error) {
        console.error('POST /generos - Erro ao criar gênero:', error);
        next(error);
    }
};

const updateGenero = async (req, res, next) => {
    const { id } = req.params;
    console.log(`PUT /generos/${id} - Dados recebidos para atualização:`, req.body);
    try {
        const validatedData = GeneroUpdateSchema.parse(req.body);
        const generoAtualizado = await GeneroService.updateGenero(id, validatedData);
        console.log(`PUT /generos/${id} - Gênero atualizado com sucesso:`, generoAtualizado);
        res.json(generoAtualizado);
    } catch (error) {
        console.error(`PUT /generos/${id} - Erro ao atualizar gênero:`, error);
        next(error);
    }
};

const softDeleteGenero = async (req, res, next) => {
    const { id } = req.params;
    console.log(`SOFT DELETE /generos/${id} - Iniciando exclusão lógica do gênero com ID ${id}`);
    try {
        const generoDeletado = await GeneroService.softDeleteGenero(id);
        console.log(`SOFT DELETE /generos/${id} - Gênero excluído logicamente com sucesso:`, generoDeletado);
        res.json(generoDeletado);
    } catch (error) {
        console.error(`SOFT DELETE /generos/${id} - Erro ao excluir gênero:`, error);
        next(error);
    }
};

module.exports = { getGeneros, getGeneroById, createGenero, updateGenero, softDeleteGenero };