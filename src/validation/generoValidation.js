const { z } = require('zod');

const GeneroSchema = z.object({
    descricao: z.string({
        required_error: 'O campo "descricao" é obrigatório.'
    })
    .min(1, { message: 'O campo "descricao" é obrigatório e deve conter pelo menos 1 caractere.' })
    .max(255, { message: 'O campo "descricao" deve conter no máximo 255 caracteres.' })
});

const GeneroUpdateSchema = GeneroSchema.partial();

module.exports = { GeneroSchema, GeneroUpdateSchema };