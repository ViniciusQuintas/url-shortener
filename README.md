# URL Shortener

A full-stack URL shortener built with TypeScript, Next.js, Node.js, PostgreSQL, and Redis.

The project was developed incrementally as a practical exercise in building and evolving a production-oriented full-stack application, with a focus on authentication, caching, background jobs, analytics, API design, and application architecture.

## Overview

The application allows authenticated users to create and manage shortened URLs. Each URL can have an optional expiration date. When a shortened URL is accessed, the application redirects the user to the original URL and records information about the access for analytics purposes.

**Features:**

- User registration and authentication with JWT
- URL creation, management, and deletion
- Short URL redirection with Redis caching
- Optional URL expiration with automatic cleanup
- Click tracking with browser and device detection
- Analytics dashboard with click charts and metrics
- Rate limiting on URL creation
- Docker Compose development environment

## Tech Stack

### Frontend

- Next.js (App Router)
- React + TypeScript
- TanStack Query
- React Hook Form + Zod
- Tailwind CSS + shadcn/ui
- Recharts

### Backend

- Node.js + Express + TypeScript
- Prisma + PostgreSQL
- Redis (caching + rate limiting)
- JWT + bcrypt
- node-cron
- nanoid
- ua-parser-js

### Infrastructure

- Docker + Docker Compose

## Architecture

```
url-shortener/
├── backend/
│   ├── prisma/
│   └── src/
│       ├── auth/           # register, login, JWT middleware
│       ├── errors/         # AppError class
│       ├── jobs/           # cron job for expired URL cleanup
│       ├── lib/            # Prisma client, Redis client, ua-parser
│       ├── middlewares/    # auth, rate limiting, error handler
│       └── urls/           # URL creation, redirect, analytics
│
└── frontend/
    └── src/
        ├── actions/        # server actions
        ├── app/            # Next.js App Router pages
        ├── components/     # UI components
        ├── services/       # API calls
        └── lib/            # utilities
```

The backend follows a controller → service → repository layered structure. Authentication, rate limiting, and error handling are handled through middleware applied at the router level.

The frontend uses Next.js App Router with TanStack Query for server state management and React Hook Form with Zod for form validation.

## Data Model

```
User
  id, name, email, passwordHash, createdAt

Url
  id, code, originalUrl, userId, expiresAt, createdAt

Click
  id, urlId, country, browser, device, createdAt
```

Each click stores the browser, device type, and timestamp of the access event. This data feeds the analytics dashboard.

## Caching

Redis is used for two purposes:

**URL redirect caching** — when a shortened URL is accessed, the application checks Redis first. On a cache miss, it fetches from PostgreSQL and stores the result with a 1-hour TTL. On delete, the cache entry is invalidated immediately.

**Rate limiting** — each authenticated user has a Redis counter with a 1-hour TTL. After 10 URL creations per hour, subsequent requests return `429 Too Many Requests`.

## Background Jobs

A `node-cron` job runs daily at midnight (America/Sao_Paulo) and deletes all URLs where `expiresAt < now()` from the database.

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create a new user |
| POST | `/auth/login` | Authenticate and receive a JWT |

### URLs (protected — requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/urls` | Create a shortened URL |
| GET | `/urls` | List all URLs for the authenticated user |
| DELETE | `/urls/:id` | Delete a URL owned by the user |
| GET | `/urls/:id/analytics` | Get click analytics for a URL |

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/urls/:code` | Redirect to the original URL |


## Running Locally

### Requirements

* Docker
* Docker Compose

No local PostgreSQL or Redis installation is required when using Docker Compose.

### 1. Clone the repository

```bash
git clone https://github.com/ViniciusQuintas/url-shortener.git
cd url-shortener
```

### 2. Configure environment variables

The project contains separate environment examples for Docker Compose and for running the backend directly with Node.js.

#### Using Docker Compose

Create the root `.env` file:

```bash
cp .env.example .env
```

The root `.env` is used by Docker Compose to configure the PostgreSQL and backend containers.

Example:

```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=urlshortener

DATABASE_URL=postgresql://admin:admin@postgres:5432/urlshortener
JWT_SECRET=your_secret_here
```

When running inside Docker, the backend connects to PostgreSQL and Redis through the Docker Compose service names:

```text
PostgreSQL → postgres:5432
Redis      → redis:6379
```

The Redis URL is configured directly by `docker-compose.yml`:

```text
redis://redis:6379
```

#### Running the backend without Docker

If the backend is executed directly on the host machine, use the backend environment file:

```bash
cd backend
cp .env.example .env
```

In this case, services running on the host are accessed through `localhost`:

```env
DATABASE_URL=postgresql://admin:admin@localhost:5432/urlshortener
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_here
```

### 3. Start the application with Docker

From the project root:

```bash
docker compose up --build
```

Docker Compose starts the complete development stack:

```text
PostgreSQL
    ↓
Redis
    ↓
Backend
    ↓
Frontend
```

The backend Docker image automatically:

1. Installs dependencies
2. Generates the Prisma Client
3. Applies pending database migrations
4. Starts the API

The migration is executed automatically with:

```bash
npx prisma migrate deploy
```

Therefore, when using Docker Compose, **there is no need to run Prisma migrations manually**.

### 4. Access the application

Once the containers are running:

* Frontend: `http://localhost:3001`
* Backend API: `http://localhost:3000`
* Health check: `http://localhost:3000/health`

The backend container exposes a Docker health check through `/health`. The frontend depends on the backend becoming healthy before starting.

### Stop the application

```bash
docker compose down
```

To remove the PostgreSQL volume and all persisted database data:

```bash
docker compose down -v
```

### Running Without Docker

If you choose to run the applications directly with Node.js, PostgreSQL and Redis must already be running locally.

#### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npx tsx src/server.ts
```

#### Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at:

* Frontend: `http://localhost:3001`
* Backend: `http://localhost:3000`


## Development History

The project was built incrementally rather than as a single implementation. The Git history reflects this progression:

1. Initial Express server setup
2. Docker Compose with PostgreSQL and Redis
3. Prisma schema and database migrations
4. User authentication with JWT and bcrypt
5. URL creation and redirect endpoints
6. Auth middleware and protected routes
7. Global error handling with AppError
8. Redis caching for redirects
9. Rate limiting with Redis
10. URL expiration and cron job cleanup
11. Click tracking with ua-parser-js
12. Analytics endpoint with daily aggregation
13. Next.js frontend with auth and dashboard
14. Analytics dashboard with Recharts
15. Tests, Docker Compose for full stack, and documentation

Each step added one concern at a time, which is visible in the commit history.