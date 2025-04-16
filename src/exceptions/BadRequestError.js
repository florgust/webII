class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400; // Código de status HTTP para "Bad Request"
    }
}

module.exports = BadRequestError;