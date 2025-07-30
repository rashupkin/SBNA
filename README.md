# SBNA

SBNA — is a modern blog platform, where users can create posts, read, comment and communicate with content. The project consists of two severals:
Frontend — application on Next.js
Backend — API on NestJS with data base MySQL

## Stack

📦 Stack technologies

- Frontend: Next.js, TypeScript, TailwindCSS, shadcn

- Backend: NestJS, Prisma ORM, JWT

- Database: MySQL

- DevOps: Docker, Docker Compose

## Start project

```bash
git clone https://github.com/rashupkin/SBNA.git
cd SBNA
```

## Make sure you have Docker installed

Check:

```bash
docker --version
docker compose version
```

## Launch project

```bash
docker compose up --build
```

after build:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Using Prisma Migrations

After first launch using migrations:

```bash
docker compose exec backend npx prisma migrate deploy
```

## Project structure

```bash
sbna/
│
├── frontend/      # Next.js client
├── backend/       # NestJS server
├── docker-compose.yml
└── README.md

```
