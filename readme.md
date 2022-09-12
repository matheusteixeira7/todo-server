# Todo Server

![Preview-Screens](http://store-images.microsoft.com/image/apps.22333.9007199266251942.d218f486-6f90-4e8a-864a-410aa7d8b05d.a15d73d1-39a4-4821-ac98-41b2da32bc36)

## Sobre este projeto

_“O planejamento não é uma tentativa de predizer o que vai acontecer. O planejamento é um instrumento para raciocinar agora, sobre que trabalhos e ações serão necessários hoje, para merecermos um futuro. O produto final do planejamento não é a informação: é sempre o trabalho.” Peter Drucker._

Esta API Rest foi desenvolvida para colocar em prática meus conhecimentos com Node.js, Clean Architecture e TDD.

## Por quê?

Este projeto faz parte do meu portfólio pessoal. Ficarei feliz se você der algum feedback sobre o projeto, código, arquitetura ou qualquer outra coisa que você quiser falar.

Me mande um e-mail: matheusteixeira@devnine.tech

Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/matheusteixeirajs).

Você pode usar este projeto como desejar. Seja para estudar, fazer melhoras ou até mesmo ganhar dinheiro com isso!

It's free!

## Funcionalidades

- User

  - criar um novo usuário para o app;
  - listar um usuário pelo id;
  - listar todos os usuários;
  - atualizar um usuário;
  - deletar um usuário;

- Project

  - criar um novo projeto para o app;
  - listar um projeto pelo id;
  - listar todos os projeto;
  - atualizar um projeto;
  - deletar um projeto;

- Tasks

  - criar uma nova tarefa atrelada a um projeto;
  - listar uma tarefa pelo id;
  - listar todas as tarefas;
  - atualizar uma tarefa;
  - deletar uma tarefa;

- Session
  - criar uma nova sessão utilizando **Json Web Token - JWT**;

## Como usar

### Pre-requisitos

Para rodar este projeto em modo de desenvolvimento, você irá precisar da Docker Engine instalada na sua máquina. Caso você não tenha, você pode instalar através deste tutorial [aqui](https://docs.docker.com/engine/install/).

### Instalando

**Cloning the Repository**

```
$ gh repo clone matheusteixeira7/todo-server

$ cd todo-server
```

Crie um arquivo .env e cole os dados contidos no arquivo .env.example

**Instalando as dependências**

Não instale as dependências através de npm install ou yarn.

Quando você rodar o comando

```
$ docker compose up -d
```

o próprio Docker irá instalar a pasta node_modules para você.

Em seguida, entre no container do APP

```
$ docker compose exec app bash
```

Agora rode o comando abaixo para gerar o schema no teu DB

```
$ npx prisma migrate dev --name init
```

Agora é só testar a aplicação :)

## Construído com

- [Node.js](https://nodejs.org/en/) - Javascript runtime
- [Express](https://expressjs.com/) - Web framework para Node.js
- [Typescript](https://www.typescriptlang.org/) - TypeScript é uma linguagem de programação fortemente tipada que se baseia em JavaScript, oferecendo melhores ferramentas em qualquer escala
- [Docker](https://www.docker.com/) - O Docker é uma plataforma open source que facilita a criação e administração de ambientes isolados
- [Clean Architecture](https://redux-saga.js.org/) - Clean Architecture é uma arquitetura de software proposta por Robert Cecil Martin (ou Uncle Bob, como é mais conhecido) que tem por objetivo padronizar e organizar o código desenvolvido, favorecer a sua reusabilidade, assim como independência de tecnologia
- [Jest](https://jestjs.io/) - Framework de testes
- [Celebrate](https://github.com/arb/celebrate) - Validação de rotas com JOI
- [Tsyringe](https://github.com/microsoft/tsyringe) - Injeção de dependência
- [Prisma](https://www.prisma.io/) - ORM
- [Swagger](https://swagger.io/) - Documentação
- [ESlint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Formatador de código

## Autor

Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/matheusteixeirajs).

Obrigado!
