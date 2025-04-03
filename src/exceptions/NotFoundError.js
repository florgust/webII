class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404; // Código de status HTTP para "Not Found"
    }
}

module.exports = NotFoundError;