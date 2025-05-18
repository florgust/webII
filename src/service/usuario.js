const prisma = require('../../prisma/prismaClient');
const NotFoundError = require('../exceptions/NotFoundError')
const bcrypt = require('bcrypt');

class UsuarioService {

    static async getUsuarios() {
        console.log('Executando getUsuarios');
        try {
            const usuarios = await prisma.usuario.findMany({
                where: { status: 1, tipo_usuario: 'comum' },
            });
            // Remove a senha dos logs e do retorno
            const usuariosSemSenha = usuarios.map(({ senha, ...rest }) => rest);
            return usuariosSemSenha;
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

            // Remove a senha dos logs e do retorno
            const { senha, ...usuarioSemSenha } = usuario;
            return usuarioSemSenha;
        } catch (error) {
            console.error(`Erro ao buscar usuário por ID: ${error}`);
            throw error;
        }
    }

    static async createUsuario(data) {
        // Nunca logar a senha!
        const { senha, ...rest } = data;
        console.log('Executando createUsuario com dados:', rest);
        try {
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            const novoUsuario = await prisma.usuario.create({
                data: {
                    nome: data.nome,
                    email: data.email,
                    senha: senhaCriptografada,
                    data_nascimento: new Date(data.data_nascimento),
                    status: data.status || 1,
                    apelido: data.apelido || null,
                    tipo_usuario: data.tipo_usuario || 'comum',
                }
            });
            // Remove a senha dos logs e do retorno
            const { senha: _, ...usuarioSemSenha } = novoUsuario;
            return usuarioSemSenha;
        } catch (error) {
            console.error(`Erro ao criar usuário: ${error}`);
            throw error;
        }
    }

    static async updateUsuario(id, data) {
        // Nunca logar a senha!
        const { senha, ...rest } = data;
        if (rest.data_nascimento) {
            rest.data_nascimento = new Date(rest.data_nascimento);
        }
        console.log('Executando updateUsuario com ID:', id, 'e dados:', rest);
        try {
            const usuario = await prisma.usuario.findUnique({
                where: { id: parseInt(id) },
            });

            if (!usuario) {
                console.error('Usuário não encontrado.');
                throw new NotFoundError('Usuário não encontrado.');
            }

            let updateData = {
                ...rest,
                updatedAt: new Date(),
            };

            if (senha) {
                updateData.senha = await bcrypt.hash(senha, 10);
            }

            const usuarioAtualizado = await prisma.usuario.update({
                where: { id: parseInt(id) },
                data: updateData,
            });
            // Remove a senha dos logs e do retorno
            const { senha: _, ...usuarioSemSenha } = usuarioAtualizado;
            return usuarioSemSenha;
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
                    status: usuario.status === 1 ? 0 : 1,
                    updatedAt: new Date(),
                },
            });
            // Remove a senha dos logs e do retorno
            const { senha, ...usuarioSemSenha } = usuarioDeletado;
            return usuarioSemSenha;
        } catch (error) {
            console.error(`Erro no delete lógico no usuário: ${error}`);
            throw error;
        }
    }
}

module.exports = { UsuarioService };