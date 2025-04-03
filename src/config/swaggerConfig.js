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
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Define onde os endpoints estão descritos
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;