const prisma = require('../../prisma/prismaClient');
const NotFoundError = require('../exceptions/NotFoundError');
const AlreadyExistsError = require('../exceptions/AlreadyExistsError');

class AvaliacaoService {
    static async getAvaliacaoByFilme(idFilme) {
        console.log('Executando getAvaliacaoByFilme com ID do filme: ', idFilme);
        try {
            const avaliacoes = await prisma.avaliacao.findMany({
                where: {
                    idFilme,
                    status: 1
                },
                include: {
                    usuario: {
                        select: { id: true, nome: true, status: true }
                    }
                }
            });

            if (avaliacoes.length === 0) {
                throw new NotFoundError(`Nenhuma avaliação encontrada para o filme com ID ${idFilme}.`);
            }

            // O retorno já terá o campo usuario: { nome: ... }
            return avaliacoes;
        } catch (error) {
            console.error('Erro ao buscar avaliações por filme: ', error);
            throw error;
        }
    }

    // ...existing code...
    static async getMediaAvaliacaoByFilme(idFilme) {
        console.log('Executando getMediaAvaliacaoByFilme com ID do filme: ', idFilme);
        try {
            const result = await prisma.avaliacao.aggregate({
                _avg: { nota: true },
                where: {
                    idFilme,
                    status: 1
                }
            });

            // Se não houver avaliações, retorna null ou 0
            return result._avg.nota || 0;
        } catch (error) {
            console.error('Erro ao calcular média das avaliações por filme: ', error);
            throw error;
        }
    }
    // ...existing code...

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
            // Verifica se já existe avaliação ativa para o mesmo usuário e filme
            const avaliacaoExistente = await prisma.avaliacao.findFirst({
                where: {
                    idUsuario,
                    idFilme,
                    status: 1
                }
            });

            if (avaliacaoExistente) {
                throw new AlreadyExistsError(`Avaliação já existe para o usuário com ID ${idUsuario} e filme com ID ${idFilme}.`);
            }

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
                    status: avaliacaoExistente.status === 1 ? 0 : 1,
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