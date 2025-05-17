const express = require('express');
const { getGeneros, getGeneroById, createGenero, updateGenero, softDeleteGenero } = require('../controller/genero');

const router = express.Router();

router.get('/generos', getGeneros);
router.get('/genero/:id', getGeneroById);
router.post('/genero', createGenero);
router.put('/genero/:id', updateGenero);
router.put('/genero/:id/delete', softDeleteGenero);

module.exports = router;