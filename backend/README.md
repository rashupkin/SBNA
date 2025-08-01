# SBNA Backend

Backend blog-platform SBNA based on NestJS

## API

### Auth

- POST /api/auth/sign-up - registration new user
- POST /api/auth/sign-in - entrance user
- POST /api/auth/refresh - refresh both JWT tokens
- POST /api/auth/logout - user exit

### Posts

- POST /api/posts - create new post
- GET /api/posts?search={search}&page={page}&limit={limit} - get list of posts by search, page
- GET /api/posts/:id - get post by ID
- POST /api/posts/:id/comments - create comment for post by ID

### Users

- GET /api/users/me - get yourself profile
- GET /api/users/:username - get user by his username

---

## Install

```bash
cd backend
yarn install
```

## Start dev mode

```bash
yarn start:dev
```

Go to http://localhost:3001

## Build for production

```bash
yarn build
yarn start:prod
```

## Environment variables

Create file .env and add necessary variables:

```ini
PORT=3001

FRONTEND_HOST=http://localhost:3000

JWT_ACCESS_TOKEN=jwt_token
EXPIRESIN_ACCESS_TOKEN=15m
JWT_REFRESH_TOKEN=jwt_token
EXPIRESIN_REFRESH_TOKEN=7d

DATABASE_URL="mysql://user:password@mysql:3306/sbna"
```

## Migrations of data base

```bash
npx prisma migrate deploy
```

## Technologies

- NestJS
- Prisma ORM
- MySQL
