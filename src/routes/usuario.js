const express = require('express')
const { getUsuarios, getUsuarioById, createUsuario, updateUsuario, softDeleteUsuario } = require('../controller/usuario')
const { autenticarUsuario, somenteAdmin, somenteProprioUsuarioOuAdmin } = require('../middleware/autenticacao')

const router = express.Router();
router.get('/usuarios', autenticarUsuario, somenteAdmin, getUsuarios);
router.get('/usuario/:id', autenticarUsuario, somenteProprioUsuarioOuAdmin, getUsuarioById);
router.post('/usuario', createUsuario);
router.put('/usuario/:id', autenticarUsuario, somenteProprioUsuarioOuAdmin, updateUsuario);
router.put('/usuario/:id/delete', autenticarUsuario, somenteProprioUsuarioOuAdmin, softDeleteUsuario);

module.exports = router;