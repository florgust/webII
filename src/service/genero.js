const prisma = require('../../prisma/prismaClient');
const NotFoundError = require('../exceptions/NotFoundError');

class GeneroService {
    static async getGeneros() {
        console.log('Executando getGeneros');
        try {
            const generos = await prisma.genero.findMany({
                where: { status: 1 }
            });
            return generos;
        } catch (error) {
            console.error('Erro ao buscar gêneros:', error);
            throw error;
        }
    }

    static async getGeneroById(id) {
        console.log('Executando getGeneroById com ID:', id);
        try {
            const genero = await prisma.genero.findUnique({
                where: { id: parseInt(id) },
            });

            if (!genero) {
                throw new NotFoundError('Gênero não encontrado.');
            }

            return genero;
        } catch (error) {
            console.error(`Erro ao buscar gênero com ID ${id}:`, error);
            throw error;
        }
    }

    static async createGenero(data) {
        console.log('Executando createGenero com dados:', data);
        try {
            const novoGenero = await prisma.genero.create({
                data,
            });
            return novoGenero;
        } catch (error) {
            console.error('Erro ao criar gênero:', error);
            throw error;
        }
    }

    static async updateGenero(id, data) {
        console.log('Executando updateGenero com ID:', id, 'e dados:', data);
        try {
            const generoExistente = await prisma.genero.findUnique({
                where: { id: parseInt(id) },
            });

            if (!generoExistente) {
                throw new NotFoundError('Gênero não encontrado.');
            }

            const generoAtualizado = await prisma.genero.update({
                where: { id: parseInt(id) },
                data: {
                    ...data,
                    updatedAt: new Date(),
                },
            });

            return generoAtualizado;
        } catch (error) {
            console.error(`Erro ao atualizar gênero com ID ${id}:`, error);
            throw error;
        }
    }

    static async softDeleteGenero(id) {
        console.log('Executando softDeleteGenero com ID:', id);
        try {
            const generoExistente = await prisma.genero.findUnique({
                where: { id: parseInt(id) },
            });

            if (!generoExistente) {
                throw new NotFoundError('Gênero não encontrado.');
            }

            const generoDeletado = await prisma.genero.update({
                where: { id: parseInt(id) },
                data: {
                    status: generoExistente.status === 1 ? 0 : 1,
                    updatedAt: new Date(),
                },
            });
            console.log('Gênero deletado logicamente com sucesso: ', generoDeletado);
            return generoDeletado;
        } catch (error) {
            console.error(`Erro ao deletar gênero com ID ${id}:`, error);
            throw error;
        }
    }
}

module.exports = { GeneroService };