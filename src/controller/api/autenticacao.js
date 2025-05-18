const { AutenticacaoService } = require('../../service/autenticacao');
const { autenticacaoSchema } = require('../../validation/autenticacaoValidation');

const autenticacao = async (req, res, next) => {
    try {
        const validateLogin = autenticacaoSchema.parse(req.body);
        const resultado = await AutenticacaoService.login({ email: validateLogin.email, senha: validateLogin.senha });
        res.json(resultado);
    } catch (error) {
        res.status(401).json({ erro: error.message });
    }
};

module.exports = { autenticacao };