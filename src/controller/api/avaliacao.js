const { AvaliacaoService } = require("../../service/avaliacao");
const { AvaliacaoSchema, IdSchema, AvaliacaoUpdateSchema } = require("../../validation/avaliacaoValidation");

const getAvaliacaoByFilme = async (req, res, next) => {
    console.log('GET /api/avaliacao - Iniciando busca de todas as avaliações por filme');
    try {
        const { id } = IdSchema.parse({ id: Number(req.params.id) });

        const avaliacoes = await AvaliacaoService.getAvaliacaoByFilme(id);
        console.log(`GET /api/avaliacao - Avaliações encontradas para o filme com ID ${id}:`, avaliacoes);
        res.json(avaliacoes);
    } catch (error) {
        console.error('GET /api/avaliacao - Erro ao buscar filmes:', error);
        next(error);
    }
};

const getAvaliacaoByUsuario = async (req, res, next) => {
    console.log('GET /api/avaliacao - Iniciando busca de todas as avaliações por usuário');
    try {
        const { id } = IdSchema.parse({ id: Number(req.params.id) });

        const avaliacoes = await AvaliacaoService.getAvaliacaoByUsuario(id);
        console.log(`GET /api/avaliacao - Avaliações encontradas para o usuário com ID ${id}:`, avaliacoes);
        res.json(avaliacoes);
    } catch (error) {
        console.error('GET /api/avaliacao - Erro ao buscar avaliações:', error);
        next(error); // Encaminha o erro para o middleware de erros
    }
};

const createAvaliacao = async (req, res, next) => {
    console.log('POST /api/avaliacao - Dados recebidos para criação:', req.body);
    try {
        const idUsuarioRaw = req.headers.idusuario; // Certifique-se de que o nome do header está correto
        const idFilmeRaw = req.headers.idfilme;
        console.log(`idUsuario: ${idUsuarioRaw} - idFilme: ${idFilmeRaw}`);

        // Validação direta dos IDs
        const idUsuario = Number(idUsuarioRaw);
        const idFilme = Number(idFilmeRaw);

        IdSchema.parse({ id: idUsuario });
        IdSchema.parse({ id: idFilme });

        const validetData = AvaliacaoSchema.parse(req.body)
        const novaAvaliacao = await AvaliacaoService.createAvaliacao(idUsuario, idFilme, validetData);
        console.log('POST /api/avaliacao - Usuário criado com sucesso:', novaAvaliacao);
        res.status(201).json(novaAvaliacao);
    } catch (error) {
        console.error('POST /api/avaliacao - Erro ao criar avaliacao:', error);
        next(error); // Encaminha o erro para o middleware de erros
    }
};

const updateAvaliacao = async (req, res, next) => {
    console.log('PUT /api/avaliacao/:id - Dados recebidos para atualização:', req.body);
    try {
        const idUsuarioRaw = req.headers.idusuario; // Certifique-se de que o nome do header está correto
        console.log(`idUsuario: ${idUsuarioRaw}`);
        // Validação direta dos IDs
        const idUsuario = Number(idUsuarioRaw);
        IdSchema.parse({ id: idUsuario });

        // Validação do ID da avaliação
        const { id: idAvaliacao } = IdSchema.parse({ id: Number(req.params.id) });

        // Validação dos dados de atualização
        const validData = AvaliacaoUpdateSchema.parse(req.body);

        // Atualiza a avaliação
        const avaliacaoAtualizada = await AvaliacaoService.updateAvaliacao(idUsuario, idAvaliacao, validData);
        console.log(`PUT /api/avaliacao/:id - Avaliação atualizada com sucesso:`, avaliacaoAtualizada);
        res.json(avaliacaoAtualizada);
    } catch (error) {
        console.error('PUT /api/avaliacao/:id - Erro ao atualizar avaliação:', error);
        next(error); // Encaminha o erro para o middleware de erros
    }
};

const softDeleteAvaliacao = async (req, res, next) => {
    console.log('DELETE /api/avaliacao/:id - Iniciando soft delete da avaliação');
    try {
        // Validação do ID da avaliação
        const { id } = IdSchema.parse({ id: Number(req.params.id) });

        // Realiza o soft delete
        const avaliacaoInativada = await AvaliacaoService.softDeleteAvaliacao(id);
        if (avaliacaoInativada.status === 0) {
            console.log(`DELETE /api/avaliacao/:id - Avaliação com ID ${id} inativada com sucesso:`, avaliacaoInativada);
            res.json({ message: `Avaliação com ID ${id} foi inativada com sucesso.` });
        } else {
            console.log(`DELETE /api/avaliacao/:id - Avaliação com ID ${id} foi reativada com sucesso.`);
            res.json({ message: `Avaliação com ID ${id} foi reativada com sucesso.` });
        }
    } catch (error) {
        console.error('DELETE /api/avaliacao/:id - Erro ao inativar avaliação:', error);
        next(error); // Encaminha o erro para o middleware de erros
    }
};

module.exports = { getAvaliacaoByFilme, getAvaliacaoByUsuario, createAvaliacao, updateAvaliacao, softDeleteAvaliacao };