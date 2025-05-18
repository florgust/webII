const { z } = require('zod');

const autenticacaoSchema = z.object({
    email: z.string()
        .email({ message: 'O campo "email" deve ser um endereço de e-mail válido.' })
        .max(255, { message: 'O campo "email" deve ter no máximo 255 caracteres.' }),
    senha: z.string()
        .min(8, { message: 'O campo "senha" deve ter pelo menos 8 caracteres.' })
        .max(100, { message: 'O campo "senha" deve ter no máximo 100 caracteres.' }),
});

module.exports = { autenticacaoSchema };