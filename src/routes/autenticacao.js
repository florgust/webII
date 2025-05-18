const express = require('express');
const { autenticacao } = require('../controller/api/autenticacao');
const router = express.Router();

// Rota de login
router.post('/autenticacao', autenticacao);

module.exports = router;