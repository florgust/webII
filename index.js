const express = require('express');
const errorHandler = require('./src/middleware/errorHandler')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocs = YAML.load('./src/config/swagger.yaml'); // Caminho para o arquivo YAML

const usuarioRouter = require('./src/routes/usuario');
const filmeRouter = require('./src/routes/filme');
const avaliacaoRouter = require('./src/routes/avaliacao')
const generoRouter = require('./src/routes/genero');
const GeneroFilmeRouter = require('./src/routes/genero_filme');
const autenticacaoRouter = require('./src/routes/autenticacao');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', usuarioRouter);
app.use('/', filmeRouter);
app.use('/', avaliacaoRouter);
app.use('/', generoRouter);
app.use('/', GeneroFilmeRouter);
app.use('/', autenticacaoRouter);

app.use(errorHandler)
// Iniciar o servidor
app.listen(3030, () => {
    console.log('Servidor rodando na porta 3030');
});