# Imersão Full Stack & FullCycle - Sistema de Venda de Ingressos

## Descrição

Repositório da API feita com Nest.js (Reserva de Ingressos)

## Rodar a aplicação

Dentro da pasta `nest` execute o comando abaixo para rodar os containers `Docker`:

```
docker compose up
```

Quando os containers estiverem prontos, precisamos acessar o container do `app` e executar a aplicação:

```
// entrar no container:
docker compose exec app bash

// instalar as dependências:
npm install

// executar a migração do primeiro parceiro:
npm run migrate:partner1


// Executar o partner1 na porta 3000
npm run start:dev
```
