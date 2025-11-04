Módulo de Avaliações e Notas
Descrição do Projeto

Sistema web desenvolvido para gerenciar alunos, avaliações e notas.
Permite cadastrar alunos, criar provas ou trabalhos e lançar notas, calculando automaticamente a média ponderada de cada aluno.

A aplicação possui autenticação com JWT, documentação com Swagger e roda completamente em Docker.

Tecnologias:

Node.js e Express

Sequelize (PostgreSQL)

JWT (autenticação)

Swagger UI

Docker e Docker Compose

Como Executar
Usando Docker (recomendado)

Na raiz do projeto, execute:

docker compose up --build


Acesse:

API: http://localhost:3000

Swagger: http://localhost:3000/docs

Frontend: abra o arquivo web/index.html no navegador

Executar manualmente (sem Docker)

Instale as dependências:

cd api
npm install


Configure o arquivo .env com as credenciais do banco de dados.

Execute o servidor:

npm run dev

Teste rápido no Swagger

POST /auth/register → criar usuário

POST /auth/login → obter token

Clique em Authorize e cole Bearer <token>

Use as rotas:

POST /alunos → criar aluno

POST /avaliacoes → criar avaliação

POST /notas → lançar nota

GET /alunos/{id}/medias → ver média do aluno