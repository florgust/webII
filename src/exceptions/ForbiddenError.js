class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Forbidden';
        this.statusCode = 403; // Código de status HTTP para "Unauthorized"
    }
}

module.exports = ForbiddenError;