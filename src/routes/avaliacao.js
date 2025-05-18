const express = require('express');
const {
    getAvaliacaoByFilme,
    getAvaliacaoByUsuario,
    createAvaliacao,
    updateAvaliacao,
    softDeleteAvaliacao
} = require('../controller/api/avaliacao');
const { autenticarUsuario, somenteProprioUsuarioOuAdmin } = require('../middleware/autenticacao');

const router = express.Router();

// Rotas para avaliações
router.get('/avaliacoes/filme/:id', getAvaliacaoByFilme); // Público
router.get('/avaliacoes/usuario/:id', getAvaliacaoByUsuario); // Público
router.post('/avaliacao', createAvaliacao); // Próprio usuário ou admin
router.put('/avaliacao/:id', autenticarUsuario, somenteProprioUsuarioOuAdmin, updateAvaliacao); // Próprio usuário ou admin
router.put('/avaliacao/:id/delete', autenticarUsuario, somenteProprioUsuarioOuAdmin, softDeleteAvaliacao); // Próprio usuário ou admin

module.exports = router;