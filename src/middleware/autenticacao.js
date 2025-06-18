const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../exceptions/UnauthorizedError');
const ForbiddenError = require('../exceptions/ForbiddenError');

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para autenticar o usuário via JWT
function autenticarUsuario(req, res, next) {
    const authHeader = req.headers?.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        throw new UnauthorizedError('Token não fornecido.');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        throw new UnauthorizedError('Token inválido.');
    }
}

// Middleware para permitir apenas o admin
function somenteAdmin(req, res, next) {
    if (req.user && req.user.tipo_usuario === 'admin') {
        return next();
    }
    throw new ForbiddenError('Acesso negado. Somente administradores podem acessar este recurso.');
}

// Middleware para permitir o próprio usuário ou admin
function somenteProprioUsuarioOuAdmin(req, res, next) {
    const { id } = req.params;
    console.log(`ID do usuário na rota: ${id}`);
    console.log(`ID do usuário autenticado: ${req.user?.id}`);
    if (
        req.user &&
        (req.user.email === 'admin.iftm@gmail.com' || req.user.id === parseInt(id))
    ) {
        return next();
    }
    throw new ForbiddenError('Acesso negado. Somente administradores podem acessar este recurso.');
}

module.exports = { autenticarUsuario, somenteAdmin, somenteProprioUsuarioOuAdmin };