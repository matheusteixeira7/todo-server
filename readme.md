# Shiny Paws API

![Preview-Screens](https://i.ibb.co/k60hdpy/clean-architecture-github.png)

## Sobre este projeto

_"Com cachorros, eu não aprendi apenas como é ter um animal de estimação, e sim a ter um amigo de verdade"._

Esta API Rest foi desenvolvida para a empresa Shiny Paws, do ramo de Pet Care, localizada em Abington, Massachusetts, com o intuito de colocar em prática tudo o que aprendi nos últimos meses sobre desenvolvimento com Node.js, Typescript, arquitetura de software, incluindo Clean Architecture e DDD, TDD, princípios SOLID, Docker, injeção de dependência e muitos mais.

## Por quê?

Este projeto faz parte do meu portfólio pessoal. Ficarei feliz se você der algum feedback sobre o projeto, código, arquitetura ou qualquer outra coisa que você quiser falar para me tornar um melhor engenheiro de software.

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

- Customer
  - criar um novo cliente para o app;
  - listar um cliente pelo id;
  - listar todos os clientes;
  - atualizar um cliente;
  - deletar um cliente;

- Pet
  - criar um novo pet atrelado ao cliente;
  - listar um pet pelo id;
  - listar o dono do pet;
  - listar todos os pets;
  - atualizar um pet;
  - deletar um pet;

- Service
  - criar um novo serviço;
  - listar um serviço pelo id;
  - listar todos os serviços;
  - atualizar um serviço;
  - deletar um serviço;

- Transaction
  - criar uma nova transação atrelando o cliente;
  - listar uma transação pelo id;
  - listar todos as transações;
  - atualizar uma transação;
  - deletar uma transação;

- Session
  - criar uma nova sessão utilizando **Json Web Token - JWT**;

## Como usar

### Pre-requisitos

Para rodar este projeto em mode de desenvolvimento, você irá precisar da Docker Engine instalada na sua máquina. Caso você não tenha, você pode instalar através deste tutorial [aqui](https://docs.docker.com/engine/install/).

### Instalando

**Cloning the Repository**

```
$ gh repo clone matheusteixeira7/shiny-paws

$ cd shiny-paws
```

**Instalando as dependências**

Não instale as dependências através de npm install ou yarn.

Quando você rodar o comando

```
$ docker compose up -d
```
o próprio Docker irá instalar a pasta node_modules para você.

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
- [ESlint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Formatador de código


## Autor

Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/matheusteixeirajs).

Obrigado!
