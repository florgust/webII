const prisma = require('../../prisma/prismaClient');
const NotFoundError = require('../exceptions/NotFoundError');

class FilmeService {
    static async getFilmes() {
        console.log('Executando getFilmes');
        try {
            const filmes = await prisma.filme.findMany({
                where: { status: 1 }
            });
            return filmes;
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            throw error;
        }
    }

    static async getFilmeById(id) {
        console.log('Executando getFilmeById com ID:', id);
        try {
            const filme = await prisma.filme.findUnique({
                where: { id: parseInt(id) },
            });

            if (!filme) {
                throw new NotFoundError('Filme não encontrado.');
            }

            return filme;
        } catch (error) {
            console.error(`Erro ao buscar filme com ID ${id}:`, error);
            throw error;
        }
    }

    static async createFilme(data) {
        console.log('Executando createFilme com dados:', data);
        try {
            const novoFilme = await prisma.filme.create({
                data,
            });
            return novoFilme;
        } catch (error) {
            console.error('Erro ao criar filme:', error);
            throw error;
        }
    }

    static async updateFilme(id, data) {
        console.log('Executando updateFilme com ID:', id, 'e dados:', data);
        try {
            const filmeExistente = await prisma.filme.findUnique({
                where: { id: parseInt(id) },
            });

            if (!filmeExistente) {
                throw new NotFoundError('Filme não encontrado.');
            }

            const filmeAtualizado = await prisma.filme.update({
                where: { id: parseInt(id) },
                data: {
                    ...data,
                    updatedAt: new Date(), // Atualiza a data de modificação
                },
            });

            return filmeAtualizado;
        } catch (error) {
            console.error(`Erro ao atualizar filme com ID ${id}:`, error);
            throw error;
        }
    }

    static async softDeleteFilme(id) {
        console.log('Executando deleteFilme com ID:', id);
        try {
            const filmeExistente = await prisma.filme.findUnique({
                where: { id: parseInt(id) },
            });

            if (!filmeExistente) {
                console.error('Filme não encontrado.')
                throw new NotFoundError('Filme não encontrado.');
            }

            const filmeDeletado = await prisma.filme.update({
                where: { id: parseInt(id) },
                data: {
                    status: 0,
                    updatedAt: new Date(),
                },
            });
            console.log('Filme deletado logicamente com sucesso: ', filmeDeletado);
            return filmeDeletado;
        } catch (error) {
            console.error(`Erro ao deletar filme com ID ${id}:`, error);
            throw error;
        }
    }
}

module.exports = { FilmeService };