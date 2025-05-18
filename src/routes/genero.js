const express = require('express');
const { getGeneros, getGeneroById, createGenero, updateGenero, softDeleteGenero } = require('../controller/genero');
const { autenticarUsuario, somenteAdmin } = require('../middleware/autenticacao');

const router = express.Router();

router.get('/generos', getGeneros);
router.get('/genero/:id', getGeneroById);
router.post('/genero', autenticarUsuario, somenteAdmin, createGenero);
router.put('/genero/:id', autenticarUsuario, somenteAdmin, updateGenero);
router.put('/genero/:id/delete', autenticarUsuario, somenteAdmin, softDeleteGenero);

module.exports = router;