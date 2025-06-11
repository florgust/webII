const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class GeneroFilmeService {

    static async getAllByFilme(idFilme) {
        return prisma.generoFilme.findMany({
            where: { idFilme }
        });
    }
    
    // Busca todos os filmes de um gênero específico
    static async getFilmesByGenero(idGenero) {
        return prisma.generoFilme.findMany({
            where: { idGenero, status: 1 },
            include: { filme: true }
        });
    }

    // Busca todos os gêneros de um filme específico
    static async getGenerosByFilme(idFilme) {
        return prisma.generoFilme.findMany({
            where: { idFilme, status: 1 },
            include: { genero: true }
        });
    }

    // Associa um gênero a um filme
    static async createGeneroFilme({ idGenero, idFilme }) {
        // Garante que não existe associação ativa igual
        const existente = await prisma.generoFilme.findUnique({
            where: { idGenero_idFilme: { idGenero, idFilme } }
        });
        if (existente && existente.status === 1) {
            throw new Error('Associação já existe e está ativa.');
        }
        return prisma.generoFilme.create({
            data: { idGenero, idFilme }
        });
    }


    // Atualiza a associação (troca o gênero ou o filme)
    static async updateGeneroFilme(id, { idGenero, idFilme }) {
        // Garante que não vai criar duplicidade
        const existente = await prisma.generoFilme.findUnique({ 
            where: { idGenero_idFilme: { idGenero, idFilme } }
        });
        if (existente && existente.id !== id) {
            throw new Error('Já existe essa associação.');
        }
        return prisma.generoFilme.update({
            where: { id },
            data: { idGenero, idFilme, updatedAt: new Date() }
        });
    }

    // Delete lógico (ativa/inativa)
    static async softDeleteGeneroFilme(id) {
        const atual = await prisma.generoFilme.findUnique({ where: { id } });
        if (!atual) throw new Error('Associação não encontrada.');
        const novoStatus = atual.status === 1 ? 0 : 1;
        return prisma.generoFilme.update({
            where: { id },
            data: { status: novoStatus }
        });
    }
}

module.exports = { GeneroFilmeService };