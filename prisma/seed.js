const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Cria gêneros
  const acao = await prisma.genero.create({ data: { descricao: 'Ação', status: 1 } });
  const comedia = await prisma.genero.create({ data: { descricao: 'Comedia', status: 1 } });
  const drama = await prisma.genero.create({ data: { descricao: 'Drama', status: 1 } });

  // Cria um filme
  const filme = await prisma.filme.create({
    data: {
      nome: 'Filme Exemplo',
      diretor: 'Diretor Exemplo',
      anoLancamento: 2024,
      duracao: 120,
      produtora: 'Produtora Exemplo',
      classificacao: 'Livre',
      poster: 'https://exemplo.com/poster.jpg',
      status: 1,
    }
  });

  // Associa gêneros ao filme (se houver tabela de relação)
  await prisma.generoFilme.createMany({
    data: [
      { idGenero: acao.id, idFilme: filme.id, status: 1 },
      { idGenero: comedia.id, idFilme: filme.id, status: 1 },
      { idGenero: drama.id, idFilme: filme.id, status: 1 },
    ]
  });

  // Cria usuários (admin e comum)
  const senhaAdmin = await bcrypt.hash('admin123', 10);
  const senhaComum = await bcrypt.hash('usuario123', 10);

  const admin = await prisma.usuario.create({
    data: {
      nome: 'Administrador',
      email: 'admin.iftm@gmail.com',
      senha: senhaAdmin,
      data_nascimento: new Date('1990-01-01'),
      status: 1,
      apelido: 'admin',
      tipo_usuario: 'admin'
    }
  });

  const usuario = await prisma.usuario.create({
    data: {
      nome: 'Usuário Comum',
      email: 'usuario@email.com',
      senha: senhaComum,
      data_nascimento: new Date('2000-01-01'),
      status: 1,
      apelido: 'usuariocomum',
      tipo_usuario: 'comum'
    }
  });

  // Cria uma avaliação do usuário no filme
  await prisma.avaliacao.create({
    data: {
      idUsuario: usuario.id,
      idFilme: filme.id,
      nota: 8.5,
      comentario: 'Ótimo filme!',
      status: 1
    }
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });