class AlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AlreadyExistsError';
        this.statusCode = 409;
    }
}

module.exports = AlreadyExistsError;