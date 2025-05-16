const express = require('express')
const { getUsuarios, getUsuarioById, createUsuario, updateUsuario, softDeleteUsuario } = require('../controller/usuario')

const router = express.Router();
router.get('/usuarios', getUsuarios);
router.get('/usuario/:id', getUsuarioById);
router.post('/usuario', createUsuario);
router.put('/usuario/:id', updateUsuario);
router.put('/usuario/:id/delete', softDeleteUsuario);

module.exports = router;