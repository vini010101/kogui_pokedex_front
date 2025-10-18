# Kogui Pokedex – Frontend

Frontend em Angular para consumir a API da Kogui Pokedex. Permite login, cadastro de usuários e gerenciamento de Pokémons, favoritos e equipe.

## Tecnologias

- Angular 16+
- TypeScript
- Tailwind CSS
- HTML5 / CSS3 / JavaScript
- Consumo de API REST (backend Django)

## Pré-requisitos

- Node.js 20+ e npm
- Angular CLI
- Git
- Backend da Kogui Pokedex rodando

## Configuração do ambiente

1. Clonar o repositório:
cd kogui_pokedex_front

2 Instalar dependências:
npm install

3 Configurar URL do backend
Abra src/environments/environment.ts
Altere apiUrl para o endereço do backend, por exemplo:
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api'
};

4 Executar servidor de desenvolvimento:
ng serve

Frontend disponível em: http://localhost:4200/
Funcionalidades
Login de usuário (JWT)
Cadastro de usuário
Listagem de Pokémons com filtros
Adição de Pokémon à lista do usuário
Gerenciamento de favoritos e equipe (máx. 6 Pokémons)
Integração com backend via API REST

Observações
Ao acessar endpoints protegidos, o JWT é armazenado localmente (localStorage) e enviado automaticamente nas requisições.
A estilização é feita com Tailwind CSS, podendo ser ajustada conforme necessidade.


Projeto desenvolvido por mim. Agradeço desde já a oportunidade de demonstrar minhas habilidades em frontend Angular e como desenvolvedor de forma completa.
