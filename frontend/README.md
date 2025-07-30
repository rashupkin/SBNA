# SBNA Frontend

Frontend blog-platform SBNA based on Next.js.

## Pages

- `/` — list of posts (main page)
- `/profile` — profile
- `/editor` — create new post
- `/logout` — logout from account
- `/sign-up` — registration
- `/sign-in` — authorization
- `/posts/{postId}` — post with comments

---

## Install

```bash
cd frontend
yarn install
```

## Start dev mode

```bash
yarn dev
```

Go to http://localhost:3000

## Build for production

```bash
yarn build
yarn start
```

## Environment variables

Create file .env and add necessary variables:

```ini
NEXT_PUBLIC_BACKEND_HOST_API=http://localhost:3001/api
```
