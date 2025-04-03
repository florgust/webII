const express = require('express');
const errorHandler = require('./src/middleware/errorHandler')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocs = YAML.load('./src/config/swaggerUsuario.yaml'); // Caminho para o arquivo YAML

const usuarioRouter = require('./src/routes/usuario');
const filmeRouter = require('./src/routes/filme');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', usuarioRouter);
app.use('/', filmeRouter);

app.use(errorHandler)
// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});