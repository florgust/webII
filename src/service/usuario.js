const prisma = require('../../prisma/prismaClient');

class UsuarioService {

    static async getUsuarios() {
        try {
            return await prisma.usuario.findMany({
                where: {status: 1}
            });
        } catch (error) {
            console.error(`Erro ao buscar usuários: ${error}`);
            throw error;
        }
    }

    static async getUsuarioById(id) {
        try {
            return await prisma.usuario.findUnique({
                where: { id: parseInt(id) }
            });
        } catch (error) {
            console.error(`Erro ao buscar usuário por ID: ${error}`);
            throw error;
        }
    }

    static async createUsuario(data) {
        try {
            const novoUsuario = await prisma.usuario.create({
                data: {
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha,
                    data_nascimento: new Date(data.data_nascimento),
                    status: data.status || 1, // Valor padrão: 1 (ativo)
                    apelido: data.apelido || null, // Valor padrão: null
                    tipo_usuario: data.tipo_usuario || 'comum',
                }
            });
            return novoUsuario
        } catch (error) {
            console.log(`error: ${error}`);
            throw error;
        }
    }

    static async updateUsuario(id, data) {
        try {
            // Verificar se o usuário existe
            const usuario = await prisma.usuario.findUnique({
                where: { id: parseInt(id) },
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }

            // Atualizar os campos fornecidos
            return await prisma.usuario.update({
                where: { id: parseInt(id) },
                data: {
                    ...data,
                    updatedAt: new Date(), // Atualiza a data de modificação
                },
            });
        } catch (error) {
            console.error(`Erro ao atualizar usuário: ${error}`);
            throw error;
        }
    }

    static async softDeleteUsuario(id) {
        try {
            // Verificar se o usuário existe
            const usuario = await prisma.usuario.findUnique({
                where: { id: parseInt(id) },
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }

            // Atualizar o status para 0 (delete lógico) usando operações atômicas
            return await prisma.usuario.update({
                where: { id: parseInt(id) },
                data: {
                    status: {
                        set: 0, // Define o status como 0
                    },
                    updatedAt: new Date(), // Atualiza a data de modificação
                },
            });
        } catch (error) {
            console.error(`Erro no delete lógico no usuário: ${error}`);
            throw error;
        }
    }
}

module.exports = { UsuarioService }; 