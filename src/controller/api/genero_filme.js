const { GeneroFilmeService } = require('../../service/genero_filme');
const { IdSchema } = require("../../validation/avaliacaoValidation");

// Busca todos os filmes de um gênero específico
const getFilmesByGenero = async (req, res, next) => {
    console.log('GET /api/genero_filme/filmes/:id - Iniciando busca de filmes por gênero');
    try {
        const { id } = IdSchema.parse({ id: Number(req.params.id) });
        const filmesGenero = await GeneroFilmeService.getFilmesByGenero(id);
        // Mapeia para retornar apenas os dados do filme
        const filmes = filmesGenero
            .filter(item => item.filme && item.filme.status === 1)
            .map(item => ({
                id: item.filme.id,
                nome: item.filme.nome,
                diretor: item.filme.diretor,
                anoLancamento: item.filme.anoLancamento,
                duracao: item.filme.duracao,
                produtora: item.filme.produtora,
                classificacao: item.filme.classificacao,
                poster: item.filme.poster
            }));
        console.log(`GET /api/genero_filme/filmes/${id} - Filmes encontrados:`, filmes);
        res.json(filmes);
    } catch (error) {
        console.error('GET /api/genero_filme/filmes/:id - Erro ao buscar filmes por gênero:', error);
        next(error);
    }
};

// Busca todos os gêneros de um filme específico
const getGenerosByFilme = async (req, res, next) => {
    console.log('GET /api/genero_filme/generos/:id - Iniciando busca de gêneros por filme');
    try {
        const { id } = IdSchema.parse({ id: Number(req.params.id) });
        const generosFilme = await GeneroFilmeService.getGenerosByFilme(id);
        const generos = generosFilme
            .filter(item => item.genero && item.genero.status === 1)
            .map(item => ({
                id: item.genero.id,
                descricao: item.genero.descricao
            }));
        console.log(`GET /api/genero_filme/generos/${id} - Gêneros encontrados:`, generos);
        res.json(generos);
    } catch (error) {
        console.error('GET /api/genero_filme/generos/:id - Erro ao buscar gêneros por filme:', error);
        next(error);
    }
};

// Associa um gênero a um filme
const createGeneroFilme = async (req, res, next) => {
    console.log('POST /api/genero_filme - Dados recebidos para associação:', req.headers);
    try {
        const idGeneroRaw = req.headers.idgenero;
        const idFilmeRaw = req.headers.idfilme;
        console.log(`POST /api/genero_filme - idGenero: ${idGeneroRaw} - idFilme: ${idFilmeRaw}`);

        const idGenero = Number(idGeneroRaw);
        const idFilme = Number(idFilmeRaw);

        IdSchema.parse({ id: idGenero });
        IdSchema.parse({ id: idFilme });

        const generoFilme = await GeneroFilmeService.createGeneroFilme({ idGenero, idFilme });
        console.log('POST /api/genero_filme - Associação criada com sucesso:', generoFilme);
        res.status(201).json(generoFilme);
    } catch (error) {
        console.error('POST /api/genero_filme - Erro ao associar gênero e filme:', error);
        next(error);
    }
};

// Atualiza o gênero de um filme (troca o gênero de um filme)
const updateGeneroFilme = async (req, res, next) => {
    console.log('PUT /api/genero_filme/:id - Dados recebidos para atualização:', req.headers);
    try {
        const { id } = IdSchema.parse({ id: Number(req.params.id) });

        const idGeneroRaw = req.headers.idgenero;
        const idFilmeRaw = req.headers.idfilme;
        console.log(`PUT /api/genero_filme/${id} - idGenero: ${idGeneroRaw} - idFilme: ${idFilmeRaw}`);

        const idGenero = Number(idGeneroRaw);
        const idFilme = Number(idFilmeRaw);

        IdSchema.parse({ id: idGenero });
        IdSchema.parse({ id: idFilme });

        const updated = await GeneroFilmeService.updateGeneroFilme(id, { idGenero, idFilme });
        console.log(`PUT /api/genero_filme/${id} - Associação atualizada com sucesso:`, updated);
        res.json(updated);
    } catch (error) {
        console.error('PUT /api/genero_filme/:id - Erro ao atualizar associação:', error);
        next(error);
    }
};

// Delete lógico da relação genero_filme
const softDeleteGeneroFilme = async (req, res, next) => {
    console.log('DELETE /api/genero_filme/:id - Iniciando soft delete da associação');
    try {
        const { id } = IdSchema.parse({ id: Number(req.params.id) });
        const deleted = await GeneroFilmeService.softDeleteGeneroFilme(id);
        if (deleted.status === 0) {
            console.log(`DELETE /api/genero_filme/${id} - Associação inativada com sucesso:`, deleted);
            res.json({ message: `Associação com ID ${id} foi inativada com sucesso.` });
        } else {
            console.log(`DELETE /api/genero_filme/${id} - Associação reativada com sucesso.`);
            res.json({ message: `Associação com ID ${id} foi reativada com sucesso.` });
        }
    } catch (error) {
        console.error('DELETE /api/genero_filme/:id - Erro ao inativar associação:', error);
        next(error);
    }
};

module.exports = {
    createGeneroFilme,
    getFilmesByGenero,
    updateGeneroFilme,
    softDeleteGeneroFilme,
    getGenerosByFilme,
};