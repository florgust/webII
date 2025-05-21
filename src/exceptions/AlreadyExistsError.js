class AlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AlreadyExistsError';
        this.statusCode = 409; // Código de status HTTP para "Bad Request"
    }
}

module.exports = AlreadyExistsError;