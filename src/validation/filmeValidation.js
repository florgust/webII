const { z } = require('zod');

const FilmeSchema = z.object({
    nome: z.string()
        .min(1, { message: 'O campo "nome" é obrigatório e deve conter pelo menos 1 caractere.' })
        .max(255, { message: 'O campo "nome" deve conter no máximo 255 caracteres.' }),

    diretor: z.string()
        .min(1, { message: 'O campo "diretor" é obrigatório e deve conter pelo menos 1 caractere.' })
        .max(255, { message: 'O campo "diretor" deve conter no máximo 255 caracteres.' }),

    anoLancamento: z.number()
        .int({ message: 'O campo "anoLancamento" deve ser um número inteiro.' })
        .min(1888, { message: 'O campo "anoLancamento" deve ser maior ou igual a 1888.' }) // Primeiro filme da história
        .max(new Date().getFullYear(), { message: 'O campo "anoLancamento" não pode ser maior que o ano atual.' }),

    duracao: z.number()
        .int({ message: 'O campo "duracao" deve ser um número inteiro.' })
        .min(1, { message: 'O campo "duracao" deve ser maior que 0.' }),

    produtora: z.string()
        .min(1, { message: 'O campo "produtora" é obrigatório e deve conter pelo menos 1 caractere.' })
        .max(255, { message: 'O campo "produtora" deve conter no máximo 255 caracteres.' }),

    classificacao: z.string()
        .regex(/^\d{1,2}\+$/, { message: 'O campo "classificacao" deve estar no formato correto, como "12+" ou "18+".' })
        .or(z.literal("Livre"), { message: 'O campo "classificacao" deve ser "Livre" ou no formato correto, como "12+".' }),

    poster: z.string()
        .url({ message: 'O campo "poster" deve ser uma URL válida.' })
});

const FilmeUpdateSchema = FilmeSchema.partial();

module.exports = { FilmeSchema, FilmeUpdateSchema };