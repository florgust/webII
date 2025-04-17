const prisma = require('../../prisma/prismaClient');
const NotFoundError = require('../exceptions/NotFoundError');

class AvaliacaoService {
    static async getAvaliacaoByFilme(idFilme) {
        console.log('Executando getAvaliacaoByFilme com ID do filme: ', idFilme);
        try {
            const avaliacoes = await prisma.avaliacao.findMany({
                where: { 
                    idFilme,
                    status: 1
                },
            });

            if (avaliacoes.length === 0) {
                throw new NotFoundError(`Nenhuma avaliação encontrada para o filme com ID ${idFilme}.`);
            }

            return avaliacoes;
        } catch (error) {
            console.error('Erro ao buscar avaliações por filme: ', error);
            throw error;
        }
    }

    static async getAvaliacaoByUsuario(idUsuario) {
        console.log('Executando getAvaliacaoByUsuario com ID do usuário: ', idUsuario);
        try {
            const avaliacoes = await prisma.avaliacao.findMany({
                where: {
                    idUsuario,
                    status: 1
                },
            });

            if (avaliacoes.length === 0) {
                throw new NotFoundError(`Nenhuma avaliação encontrada para o usuário com ID ${idUsuario}.`);
            }

            return avaliacoes;
        } catch (error) {
            console.error('Erro ao buscar avaliações por usuário: ', error);
            throw error;
        }
    }

    static async createAvaliacao(idUsuario, idFilme, data) {
        console.log('Executando createAvaliacao com dados: ', data);
        try {
            const novaAvaliacao = await prisma.avaliacao.create({
                data: {
                    idUsuario,
                    idFilme,
                    ...data,
                }
            });
            return novaAvaliacao;
        } catch (error) {
            console.error('Erro ao criar avaliacao: ', error);
            throw error;
        }
    }

    static async updateAvaliacao(idUsuario, id, data) {
        console.log('Executando updateAvaliacao com ID:', id, 'e dados:', data);
        try {
            // Verifica se a avaliação existe
            const avaliacaoExistente = await prisma.avaliacao.findUnique({
                where: { 
                    idUsuario,
                    id,
                },
            });

            if (!avaliacaoExistente) {
                throw new NotFoundError(`Avaliação com ID ${id} não encontrada.`);
            }

            // Atualiza a avaliação
            const avaliacaoAtualizada = await prisma.avaliacao.update({
                where: { id },
                data: {
                    ...data,
                    updatedAt: new Date(), // Atualiza a data de modificação
                },
            });

            return avaliacaoAtualizada;
        } catch (error) {
            console.error('Erro ao atualizar avaliação:', error);
            throw error;
        }
    }

    static async softDeleteAvaliacao(id) {
        console.log('Executando softDeleteAvaliacao com ID:', id);
        try {
            // Verifica se a avaliação existe
            const avaliacaoExistente = await prisma.avaliacao.findUnique({
                where: { id },
            });

            if (!avaliacaoExistente) {
                throw new NotFoundError(`Avaliação com ID ${id} não encontrada.`);
            }

            // Atualiza o status para 0 (inativo)
            const avaliacaoInativada = await prisma.avaliacao.update({
                where: { id },
                data: {
                    status: 0,
                    updatedAt: new Date(),
                },
            });

            return avaliacaoInativada;
        } catch (error) {
            console.error('Erro ao realizar soft delete na avaliação:', error);
            throw error;
        }
    }
}

module.exports = { AvaliacaoService };