const express = require('express');
const {
    getAvaliacaoByFilme,
    getAvaliacaoByUsuario,
    createAvaliacao,
    updateAvaliacao,
    softDeleteAvaliacao
} = require('../controller/api/avaliacao');

const router = express.Router();

// Rotas para avaliações
router.get('/avaliacoes/filme/:id', getAvaliacaoByFilme); // Busca avaliações por filme
router.get('/avaliacoes/usuario/:id', getAvaliacaoByUsuario); // Busca avaliações por usuário
router.post('/avaliacao', createAvaliacao); // Criação de uma nova avaliação
router.put('/avaliacao/:id', updateAvaliacao); // Atualização de uma avaliação
router.put('/avaliacao/:id/delete', softDeleteAvaliacao); // Soft delete de uma avaliação

module.exports = router;