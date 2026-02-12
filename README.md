# estagio_ERRE

## Descrição do Projeto
O Projeto consiste na criação de uma aplicação web simples, onde é possível gerir e visualizar o CV e uma lista de projetos.    

---

## Tecnologias Utilizadas
- **Frontend:** React (a desenvolver)
- **Backend:** Node.js + Express
- **Base de Dados:** PostgreSQL
- **HTTP Client:** Axios
- **Envio de Emails:** Formspree
- **Controlo de Versões:** Git / GitHub

---

## Arquitetura

### Backend
- **Routes** – Definição de endpoints
- **Controllers** – Gestão de pedidos/respostas
- **Services** – Lógica de negócio
- **Database/Repository** – Queries SQL
- **Middlewares** – Controlo de permissões (admin key)


### Frontend
- **Pages** – CV, Projetos, Login e Painel Admin
- **Components** – Cards de projeto e formulário
- **Utils** – Gestão de login e admin key
- **API** – Configuração do Axios para comunicação com o backend

---

## Diário de Desenvolvimento

### Dia 1 – 09/02/2026
- Definição da ideia geral da aplicação.
- Configuração do repositório GitHub.
- Criação do **User Flow** (fluxo de utilizador).
- Criação do **Diagrama ER** da base de dados.
- Planeamento inicial da arquitetura do sistema.

---

### Dia 2 – 10/02/2026
- Criação do **Backend em Node.js com Express**.
- Ligação à **Base de Dados PostgreSQL**.
- Implementação do CRUD de projetos:
  - Criar projeto
  - Listar projetos
  - Editar projeto
  - Apagar projeto
- Implementação de um **admin guard** através de "x-admin-key".
- Testes de endpoints utilizando Postman.
- Estruturação do projeto em camadas (routes, controllers, services, middlewares).

---

### Dia 3 – 11/02/2026
- Configuração do **Formspree** e envio de emails funcional.
- Criação do **Frontend em React**.
- Integração do **Axios**.
- Implementação das páginas:
  - CV
  - Projetos públicos
  - Login simples
  - Painel Admin
- Implementação do CRUD completo no frontend.
- Testes de integração frontend ↔ backend.

---

### Dia 4 – 12/02/2026
- Desenvolvimento do **Frontend** completo.

---

## Estado Atual do Projeto
- Backend funcional.
- Base de dados criada e ligada.
- CRUD completo funcional.
- Frontend funcional.
- Envio de emails ativo.

---

## Próximos Passos
- Melhorar design frontend
- Implentar autenticação com tokens
