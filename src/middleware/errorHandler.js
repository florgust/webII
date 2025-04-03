const NotFoundError = require('../exceptions/NotFoundError');

const errorHandler = (err, req, res, next) => {
    // Verifica se o erro é uma exceção personalizada
    if (err.statusCode) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    // Caso contrário, trata como um erro genérico
    console.error(err); // Log do erro para depuração
    res.status(500).json({ error: 'Erro interno do servidor.' });
};

module.exports = errorHandler;