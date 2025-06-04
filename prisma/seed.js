const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Limpeza das tabelas (ordem correta)
  await prisma.avaliacao.deleteMany();
  await prisma.generoFilme.deleteMany();
  await prisma.filme.deleteMany();
  await prisma.genero.deleteMany();
  await prisma.usuario.deleteMany();

  // Criação de gêneros
  const generos = await prisma.genero.createMany({
    data: [
      { descricao: 'Ação', status: 1 },
      { descricao: 'Comédia', status: 1 },
      { descricao: 'Drama', status: 1 },
      { descricao: 'Terror', status: 1 },
      { descricao: 'Ficção Científica', status: 1 },
      { descricao: 'Romance', status: 1 },
      { descricao: 'Aventura', status: 1 },
      { descricao: 'Animação', status: 1 },
      { descricao: 'Suspense', status: 1 },
      { descricao: 'Fantasia', status: 1 },
      { descricao: 'Documentário', status: 1 },
    ]
  });

  // Recupera os gêneros criados
  const generosCriados = await prisma.genero.findMany();

  // Criação de filmes
  const filmesData = [
    {
      nome: 'O Senhor dos Anéis: A Sociedade do Anel',
      diretor: 'Peter Jackson',
      anoLancamento: 2001,
      duracao: 178,
      produtora: 'New Line Cinema',
      classificacao: '12+',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/b5pl6GmQmTCHmZKEBhXPN0gmoAq.jpg',
      status: 1,
      generos: ['Aventura', 'Fantasia', 'Ação']
    },
    {
      nome: 'The Last Of Us',
      diretor: 'Neil Druckmann',
      anoLancamento: 2023,
      duracao: 178,
      produtora: 'HBO',
      classificacao: '16+',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/el1KQzwdIm17I3A6cYPfsVIWhfX.jpg',
      status: 1,
      generos: ['Drama', 'Ação', 'Suspense']
    },
    {
      nome: 'Interestelar',
      diretor: 'Christopher Nolan',
      anoLancamento: 2014,
      duracao: 169,
      produtora: 'Paramount Pictures',
      classificacao: '12+',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg',
      status: 1,
      generos: ['Ficção Científica', 'Drama', 'Aventura']
    },
    {
      nome: 'Toy Story',
      diretor: 'John Lasseter',
      anoLancamento: 1995,
      duracao: 81,
      produtora: 'Pixar',
      classificacao: 'Livre',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
      status: 1,
      generos: ['Animação', 'Aventura', 'Comédia']
    },
    {
      nome: 'Titanic',
      diretor: 'James Cameron',
      anoLancamento: 1997,
      duracao: 195,
      produtora: '20th Century Fox',
      classificacao: '12+',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
      status: 1,
      generos: ['Romance', 'Drama']
    },
    {
      nome: 'O Iluminado',
      diretor: 'Stanley Kubrick',
      anoLancamento: 1980,
      duracao: 146,
      produtora: 'Warner Bros.',
      classificacao: '16+',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7ceEaLciLfksJkSHqp0vLE5eLyy.jpg',
      status: 1,
      generos: ['Terror', 'Suspense']
    },
    {
      nome: 'Matrix',
      diretor: 'Lana Wachowski, Lilly Wachowski',
      anoLancamento: 1999,
      duracao: 136,
      produtora: 'Warner Bros.',
      classificacao: '14+',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      status: 1,
      generos: ['Ação', 'Ficção Científica']
    },
    {
      nome: 'Divertida Mente',
      diretor: 'Pete Docter',
      anoLancamento: 2015,
      duracao: 95,
      produtora: 'Pixar',
      classificacao: 'Livre',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/lRHE0vzf3oYJrhbsHXjIkF4Tl5A.jpg',
      status: 1,
      generos: ['Animação', 'Comédia', 'Drama']
    },
    {
      nome: 'Pantera Negra',
      diretor: 'Ryan Coogler',
      anoLancamento: 2018,
      duracao: 134,
      produtora: 'Marvel Studios',
      classificacao: '12+',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
      status: 1,
      generos: ['Ação', 'Aventura', 'Ficção Científica']
    },
    {
      nome: 'A Origem',
      diretor: 'Christopher Nolan',
      anoLancamento: 2010,
      duracao: 148,
      produtora: 'Warner Bros.',
      classificacao: '14+',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      status: 1,
      generos: ['Ação', 'Suspense', 'Ficção Científica']
    },
    {
      nome: 'O Rei Leão',
      diretor: 'Roger Allers, Rob Minkoff',
      anoLancamento: 1994,
      duracao: 88,
      produtora: 'Disney',
      classificacao: 'Livre',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/8aIvm8OaJISOpVTt7rMIh7X35G5.jpg',
      status: 1,
      generos: ['Animação', 'Aventura', 'Drama']
    }
  ];

  // Cria os filmes e associa os gêneros
  const filmesCriados = [];
  for (const filme of filmesData) {
    const novoFilme = await prisma.filme.create({
      data: {
        nome: filme.nome,
        diretor: filme.diretor,
        anoLancamento: filme.anoLancamento,
        duracao: filme.duracao,
        produtora: filme.produtora,
        classificacao: filme.classificacao,
        poster: filme.poster,
        status: filme.status
      }
    });
    filmesCriados.push(novoFilme);

    // Associa os gêneros ao filme
    for (const generoNome of filme.generos) {
      const genero = generosCriados.find(g => g.descricao === generoNome);
      if (genero) {
        await prisma.generoFilme.create({
          data: {
            idGenero: genero.id,
            idFilme: novoFilme.id,
            status: 1
          }
        });
      }
    }
  }

  // Criação de usuários
  const senhaAdmin = await bcrypt.hash('Admin123@', 10);
  const senhaComum = await bcrypt.hash('Usuario123@', 10);

  const usuariosData = [
    {
      nome: 'Administrador',
      email: 'admin.iftm@gmail.com',
      senha: senhaAdmin,
      data_nascimento: new Date('1990-01-01'),
      status: 1,
      apelido: 'admin',
      tipo_usuario: 'admin'
    },
    {
      nome: 'João Silva',
      email: 'joao@email.com',
      senha: senhaComum,
      data_nascimento: new Date('1995-05-10'),
      status: 1,
      apelido: 'joaosilva',
      tipo_usuario: 'comum'
    },
    {
      nome: 'Maria Souza',
      email: 'maria@email.com',
      senha: senhaComum,
      data_nascimento: new Date('1998-08-20'),
      status: 1,
      apelido: 'mariasouza',
      tipo_usuario: 'comum'
    },
    {
      nome: 'Carlos Pereira',
      email: 'carlos@email.com',
      senha: senhaComum,
      data_nascimento: new Date('2001-03-15'),
      status: 1,
      apelido: 'carlosp',
      tipo_usuario: 'comum'
    },
    {
      nome: 'Ana Oliveira',
      email: 'ana@email.com',
      senha: senhaComum,
      data_nascimento: new Date('2002-12-05'),
      status: 1,
      apelido: 'anaoliveira',
      tipo_usuario: 'comum'
    }
  ];

  const usuariosCriados = [];
  for (const usuario of usuariosData) {
    const novoUsuario = await prisma.usuario.create({ data: usuario });
    usuariosCriados.push(novoUsuario);
  }

  // Todos os usuários avaliam todos os filmes
  const comentarios = [
    'Ótimo filme!',
    'Gostei bastante.',
    'Muito bom!',
    'Recomendo!',
    'Assistiria de novo.',
    'Excelente produção.',
    'História envolvente.',
    'Atuações incríveis.',
    'Trilha sonora marcante.',
    'Visual impressionante.'
  ];

  for (const usuario of usuariosCriados) {
    for (let i = 0; i < filmesCriados.length; i++) {
      await prisma.avaliacao.create({
        data: {
          idUsuario: usuario.id,
          idFilme: filmesCriados[i].id,
          nota: Math.floor(Math.random() * 3) + 3, // notas entre 3 e 5
          comentario: comentarios[i % comentarios.length],
          status: 1
        }
      });
    }
  }

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