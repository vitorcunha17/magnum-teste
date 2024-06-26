# Magnum Teste

## Descrição do Projeto

Este projeto é uma aplicação web para gerenciamento financeiro, permitindo aos usuários realizar operações básicas como visualizar saldo, fazer transações (TED/PIX) e ver um histórico de transações. A aplicação foi desenvolvida utilizando React com Context API para gerenciamento de estado global.

## Funcionalidades

- **Autenticação de Usuário**
  - Login e logout de usuários
  - Registro de novos usuários
  - Autenticação usando JSON Web Tokens (JWT)

- **Home**
  - Exibir o saldo atual do usuário
  - Exibir um resumo das últimas transações

- **Registro de Transações**
  - Realizar transações financeiras (TED/PIX)
  - Validação de senha de transação (simulada no backend)
  - Campos obrigatórios: Tipo (TED, PIX), Banco (TED), Agência (TED), Conta (TED), Chave (PIX), Valor, Data da Transferência, Descrição (opcional)

- **Histórico de Transações**
  - Listar todas as transações realizadas pelo usuário
  - Filtrar transações por tipo, período, data e valor
  - Ordenar transações por data

## Tecnologias Utilizadas

- React
- Context API
- React Router
- Axios
- JSON Server (para API mock)
- Jest e React Testing Library (para testes automatizados)

## Estrutura do Projeto


## Pré-requisitos

- Node.js
- Yarn

## Instalação

1. Clone o repositório:

    git clone https://github.com/seu-usuario/magnum-teste.git
    cd banco-financeiro

2. Instale as dependências:

    yarn install

## Execução

Em um terminal separado, inicie a aplicação React:

    yarn start

## Testes

Para rodar os testes automatizados, utilize o comando:

    yarn test

