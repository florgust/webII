const express = require('express');
const usuarioRouter = require('./src/routes/usuario')

const app = express();
app.use(express.json());

app.use('/', usuarioRouter)

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});