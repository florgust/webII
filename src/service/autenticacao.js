const prisma = require('../../prisma/prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Use variável de ambiente em produção

class AutenticacaoService {
    static async login({ email, senha }) {
        // Verifica se o email e a senha foram fornecidos
        if (!email || !senha) {
            throw new Error('Email e senha são obrigatórios');
        }
        //Log de entrada de dados
        // Busca o usuário pelo email
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!usuario || usuario.status !== 1) {
            throw new Error('Usuário ou senha inválidos');
        }

        // Verifica a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error('Usuário ou senha inválidos');
        }

        // Monta o payload do token
        const payload = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            data_nascimento: usuario.data_nascimento,
            apelido: usuario.apelido || undefined,
            tipo_usuario: usuario.tipo_usuario
        };

        // Gera o token JWT
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        // Retorna o token e os dados do usuário (sem a senha)
        return { token, usuario: payload };
    }
}

module.exports = { AutenticacaoService };