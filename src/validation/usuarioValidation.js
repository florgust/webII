const { z } = require('zod');

const UsuarioSchema = z.object({
    nome: z.string()
        .min(3, { message: 'O campo "nome" deve ter pelo menos 3 caracteres. ' })
        .max(100, { message: 'O campo "nome" deve ter no máximo 100Q caracteres. ' }),

    email: z.string()
        .email({ message: 'O campo "email" deve ser um email válido.' })
        .min(3, { message: 'O campo "email" deve ter pelo menos 3 caracteres.' }),

    senha: z.string()
        .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
        .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula.' })
        .regex(/[a-z]/, { message: 'A senha deve conter pelo menos uma letra minúscula.' })
        .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número.' })
        .regex(/[@$!%*?&]/, { message: 'A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &).' }),

    data_nascimento: z.string()
        .refine((data) => {
            const hoje = new Date();
            const nascimento = new Date(data);
            const idade = hoje.getFullYear() - nascimento.getFullYear();
            return idade >= 16;
        }, { message: 'O usuário deve ter pelo menos 16 anos.' }),

    apelido: z.string()
        .min(3, { message: 'O campo "apelido" deve ter pelo menos 3 caracteres.' })
        .max(50, { message: 'O campo "apelido" deve ter no máximo 50 caracteres.' })
        .optional()
})

const UsuarioUpdateSchema = UsuarioSchema.partial();

module.exports = { UsuarioSchema, UsuarioUpdateSchema }