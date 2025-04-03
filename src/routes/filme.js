const express = require('express');
const { getFilmes, getFilmeById, createFilme, updateFilme, deleteFilme } = require('../controller/filme');

const router = express.Router();

router.get('/filmes', getFilmes);
router.get('/filme/:id', getFilmeById);
router.post('/filme', createFilme);
router.put('/filme/:id', updateFilme);
router.delete('/filme/:id', deleteFilme);

module.exports = router;