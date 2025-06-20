const swaggerJsdoc = require('swagger-jsdoc')

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sistema de filmes - boscov',
            version: '1.0.0',
            description: 'Esta documentação é para demonstrar as funcionalidades das APIs do sistema boscov',
        },
        servers: [
            {
                url: 'http://localhost:3030',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;