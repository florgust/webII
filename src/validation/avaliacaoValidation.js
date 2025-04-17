const { z } = require('zod');

const AvaliacaoSchema = z.object({
    nota: z.number()
        .min(0, { message: 'O campo "nota" deve ser maior ou igual a 0.' })
        .max(10, { message: 'O campo "nota" deve ser menor ou igual a 10.' }),

    comentario: z.string()
        .max(500, { message: 'O campo "comentario" deve conter no máximo 500 caracteres.' })
        .optional() // Campo opcional
});

const IdSchema = z.object({
    id: z.number()
        .int({ message: 'O parâmetro "id" deve ser um número inteiro.' })
        .min(1, { message: 'O parâmetro "id" deve ser maior que 0.' })
});

const AvaliacaoUpdateSchema = AvaliacaoSchema.partial();

module.exports = { AvaliacaoSchema, IdSchema, AvaliacaoUpdateSchema };