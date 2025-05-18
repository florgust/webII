const express = require('express');
const {
    createGeneroFilme,
    getFilmesByGenero,
    updateGeneroFilme,
    softDeleteGeneroFilme,
    getGenerosByFilme
} = require('../controller/api/genero_filme');
const { autenticarUsuario, somenteAdmin } = require('../middleware/autenticacao');

const router = express.Router();

router.get('/genero_filme/filmes/:id', getFilmesByGenero); // Público
router.get('/genero_filme/generos/:id', getGenerosByFilme); // Público
router.post('/genero_filme', autenticarUsuario, somenteAdmin, createGeneroFilme); // Admin
router.put('/genero_filme/:id', autenticarUsuario, somenteAdmin, updateGeneroFilme); // Admin
router.put('/genero_filme/:id/delete', autenticarUsuario, somenteAdmin, softDeleteGeneroFilme); // Admin

module.exports = router;