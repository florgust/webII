const express = require('express');
const { getFilmesDesativados, getFilmes, getFilmeById, getFilmesByNome, createFilme, updateFilme, softDeleteFilme } = require('../controller/filme');
const { autenticarUsuario, somenteAdmin } = require('../middleware/autenticacao');

const router = express.Router();

router.get('/filmes', getFilmes); // Público
router.get('/filme/:id', getFilmeById); // Público
router.get('/filmes/:nome', getFilmesByNome); // Público
router.get('/desativados/filmes', autenticarUsuario, somenteAdmin, getFilmesDesativados); // Somente admin
router.post('/filme', autenticarUsuario, somenteAdmin, createFilme); // Somente admin
router.put('/filme/:id', autenticarUsuario, somenteAdmin, updateFilme); // Somente admin
router.put('/filme/:id/delete', autenticarUsuario, somenteAdmin, softDeleteFilme); // Somente admin

module.exports = router;