# Like Me - Parte II
Backend con Node.js + Express + PostgreSQL

## Instrucciones completas
1. Configurar PostgreSQL:
CREATE DATABASE likeme;
\c likeme
CREATE TABLE posts (id SERIAL, titulo VARCHAR(25), img VARCHAR(1000), description VARCHAR(255), likes INT);

2. Iniciar backend:
cd backend
npm install
node index.js

3. Iniciar frontend:
cd frontend
npm install
npm run dev

4. Endpoints backend:
- PUT /posts/like/:id → Suma likes
- DELETE /posts/:id → Elimina post
- GET /posts → Lista posts
- POST /posts → Crea post

## Puertos
- Backend: http://localhost:3000
- Frontend: http://localhost:5173