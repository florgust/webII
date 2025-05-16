const prisma = require('../../prisma/prismaClient');
const NotFoundError = require('../exceptions/NotFoundError')

class UsuarioService {

    static async getUsuarios() {
        console.log('Executando getUsuarios');
        try {
            const usuarios = await prisma.usuario.findMany({
                where: { status: 1 }
            });
            console.log('Resultado de getUsuarios:', usuarios);
            return usuarios;
        } catch (error) {
            console.error(`Erro ao buscar usuários: ${error}`);
            throw error;
        }
    }

    static async getUsuarioById(id) {
        console.log('Executando getUsuarioById com ID:', id);
        try {
            const usuario = await prisma.usuario.findUnique({
                where: { id: parseInt(id) }
            });

            if (!usuario) {
                console.error('Usuário não encontrado.');
                throw new NotFoundError('Usuário não encontrado.');
            }

            console.log('Resultado de getUsuarioById:', usuario);
            return usuario;
        } catch (error) {
            console.error(`Erro ao buscar usuário por ID: ${error}`);
            throw error;
        }
    }

    static async createUsuario(data) {
        console.log('Executando createUsuario com dados:', data);
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
            console.log('Usuário criado com sucesso:', novoUsuario);
            return novoUsuario;
        } catch (error) {
            console.error(`Erro ao criar usuário: ${error}`);
            throw error;
        }
    }

    static async updateUsuario(id, data) {
        console.log('Executando updateUsuario com ID:', id, 'e dados:', data);
        try {
            const usuario = await prisma.usuario.findUnique({
                where: { id: parseInt(id) },
            });

            if (!usuario) {
                console.error('Usuário não encontrado.');
                throw new NotFoundError('Usuário não encontrado.');
            }

            const usuarioAtualizado = await prisma.usuario.update({
                where: { id: parseInt(id) },
                data: {
                    ...data,
                    data_nascimento: new Date(data.data_nascimento),
                    updatedAt: new Date(), // Atualiza a data de modificação
                },
            });
            console.log('Usuário atualizado com sucesso:', usuarioAtualizado);
            return usuarioAtualizado;
        } catch (error) {
            console.error(`Erro ao atualizar usuário: ${error}`);
            throw error;
        }
    }

    static async softDeleteUsuario(id) {
        console.log('Executando softDeleteUsuario com ID:', id);
        try {
            const usuario = await prisma.usuario.findUnique({
                where: { id: parseInt(id) },
            });

            if (!usuario) {
                console.error('Usuário não encontrado.');
                throw new NotFoundError('Usuário não encontrado.');
            }

            const usuarioDeletado = await prisma.usuario.update({
                where: { id: parseInt(id) },
                data: {
                    status: usuario.status === 1 ? 0 : 1, // Define o status como 0 (inativo)
                    updatedAt: new Date(), // Atualiza a data de modificação
                },
            });
            console.log('Usuário deletado logicamente com sucesso:', usuarioDeletado);
            return usuarioDeletado;
        } catch (error) {
            console.error(`Erro no delete lógico no usuário: ${error}`);
            throw error;
        }
    }
}

module.exports = { UsuarioService }; 