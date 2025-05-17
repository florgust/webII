const express = require('express');
const {
    createGeneroFilme,
    getFilmesByGenero,
    updateGeneroFilme,
    softDeleteGeneroFilme,
    getGenerosByFilme
} = require('../controller/api/genero_filme');

const router = express.Router();


router.get('/genero_filme/filmes/:id', getFilmesByGenero);
router.get('/genero_filme/generos/:id', getGenerosByFilme);
router.post('/genero_filme', createGeneroFilme);
router.put('/genero_filme/:id', updateGeneroFilme);
router.put('/genero_filme/:id/delete', softDeleteGeneroFilme);

module.exports = router;