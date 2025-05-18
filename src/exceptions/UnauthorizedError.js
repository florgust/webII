class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401; // Código de status HTTP para "Unauthorized"
    }
}

module.exports = UnauthorizedError;