const { UsuarioService } = require('../service/usuario')
const { UsuarioSchema } = require('../validation/usuarioValidation')
const { UsuarioUpdateSchema } = require('../validation/usuarioValidation')

const getUsuarios = async (req, res, next) => {
    console.log('GET /usuarios - Iniciando busca de todos os usuários');
    try {
        const usuarios = await UsuarioService.getUsuarios();
        console.log('GET /usuarios - Usuários encontrados:', usuarios);
        res.json(usuarios);
    } catch (error) {
        console.error('GET /usuarios - Erro ao buscar usuários:', error);
        next(error); // Encaminha o erro para o middleware de erros
    }
};


const getUsuarioById = async (req, res, next) => {
    const { id } = req.params;
    console.log(`GET /usuarios/${id} - Iniciando busca do usuário com ID ${id}`);
    try {
        const usuario = await UsuarioService.getUsuarioById(id);
        console.log(`GET /usuarios/${id} - Usuário encontrado:`, usuario);
        res.json(usuario);
    } catch (error) {
        console.error(`GET /usuarios/${id} - Erro ao buscar usuário:`, error);
        next(error); // Encaminha o erro para o middleware de erros
    }
};


const createUsuario = async (req, res, next) => {
    console.log('POST /usuarios - Dados recebidos para criação:', req.body);
    try {
        const validetData = UsuarioSchema.parse(req.body)
        const novoUsuario = await UsuarioService.createUsuario(validetData);
        console.log('POST /usuarios - Usuário criado com sucesso:', novoUsuario);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('POST /usuarios - Erro ao criar usuário:', error);
        next(error); // Encaminha o erro para o middleware de erros
    }
};

const updateUsuario = async (req, res, next) => {
    const { id } = req.params;
    console.log(`PUT /usuario/${id} - Dados recebidos para atualização:`, req.body);
    try {
        const validetData = UsuarioUpdateSchema.parse(req.body)
        const updatedUsuario = await UsuarioService.updateUsuario(id, validetData);
        console.log(`PUT /usuario/${id} - Usuário atualizado com sucesso:`, updatedUsuario);
        res.json(updatedUsuario);
    } catch (error) {
        console.error(`PUT /usuario/${id} - Erro ao atualizar usuário:`, error);
        next(error); // Encaminha o erro para o middleware de erros
    }
};

// delete logico
const softDeleteUsuario = async (req, res, next) => {
    const { id } = req.params;
    console.log(`SOFT DELETE /usuarios/${id} - Iniciando exclusão lógica do usuário com ID ${id}`);
    try {
        const updatedUsuario = await UsuarioService.softDeleteUsuario(id);
        console.log(`SOFT DELETE /usuarios/${id} - Usuário excluído logicamente com sucesso:`, updatedUsuario);
        res.json(updatedUsuario);
    } catch (error) {
        console.error(`SOFT DELETE /usuarios/${id} - Erro ao excluir usuário:`, error);
        next(error); // Encaminha o erro para o middleware de erros
    }
};


module.exports = { getUsuarios, createUsuario, getUsuarioById, updateUsuario, softDeleteUsuario };