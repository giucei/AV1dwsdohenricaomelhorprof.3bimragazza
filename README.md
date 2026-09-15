# Template didático de autenticação com Node.js

# Sistema de Autenticação Web — AV1 e AV2

Projeto desenvolvido para as atividades de AV1 e AV2 da disciplina de Desenvolvimento de Sistemas Web.

O sistema implementa autenticação de usuários com cadastro, login, criptografia de senha, autenticação por JWT e acesso a páginas protegidas. Na AV2, o backend foi integrado a uma interface desenvolvida em React.

## 🚀 Funcionalidades

### Backend
- Cadastro de usuários
- Login de usuários
- Criptografia de senhas com bcrypt
- Autenticação utilizando JWT
- Middleware para proteção de rotas
- Controle de acesso por perfil
- Rota privada de perfil
- Rota administrativa
- Validação de acesso com respostas HTTP 200, 401 e 403

### Frontend
- Página de login
- Página de cadastro
- Página de perfil
- Navegação com React Router
- Comunicação com o backend utilizando Axios
- Armazenamento do token no localStorage
- Proteção visual da página de perfil
- Logout com remoção da sessão
- Interface responsiva e organizada

## 🛠️ Tecnologias utilizadas

### Backend
- Node.js
- Express
- Prisma ORM
- MySQL
- bcrypt
- JSON Web Token (JWT)
- dotenv
- CORS

### Frontend
- React
- Vite
- Axios
- React Router DOM
- JavaScript
- CSS

## 📁 Estrutura do projeto

```text
/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Login.css
│   │   │   ├── Cadastro.jsx
│   │   │   ├── Cadastro.css
│   │   │   ├── Perfil.jsx
│   │   │   └── Perfil.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── app.js
│   ├── prismaClient.js
│   └── server.js
│
├── .env.example
├── package.json
└── README.md
