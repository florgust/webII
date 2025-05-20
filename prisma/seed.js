const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Apaga tudo na ordem correta (filhos antes dos pais)
  await prisma.avaliacao.deleteMany();
  await prisma.generoFilme.deleteMany();
  await prisma.filme.deleteMany();
  await prisma.genero.deleteMany();
  await prisma.usuario.deleteMany();

  // Cria gêneros
  const acao = await prisma.genero.create({ data: { descricao: 'Ação', status: 1 } });
  const comedia = await prisma.genero.create({ data: { descricao: 'Comedia', status: 1 } });
  const drama = await prisma.genero.create({ data: { descricao: 'Drama', status: 1 } });

  // Cria filmes
  const filme = await prisma.filme.create({
    data: {
      nome: 'O Senhor dos Anéis: A Sociedade do Anel',
      diretor: 'Peter Jackson',
      anoLancamento: 2001,
      duracao: 178,
      produtora: 'New Line Cinema',
      classificacao: '12+',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/b5pl6GmQmTCHmZKEBhXPN0gmoAq.jpg',
      status: 1,
    }
  });

  await prisma.filme.create({
    data: {
      nome: 'The Last Of Us',
      diretor: 'Neil Druckmann',
      anoLancamento: 2023,
      duracao: 178,
      produtora: 'HBO',
      classificacao: '16+',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/el1KQzwdIm17I3A6cYPfsVIWhfX.jpg',
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
  const senhaAdmin = await bcrypt.hash('Admin123@', 10);
  const senhaComum = await bcrypt.hash('Usuario123@', 10);

  await prisma.usuario.create({
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
      nota: 3,
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