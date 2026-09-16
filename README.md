# URL Shortener

A full-stack URL shortener built with TypeScript, Next.js, Node.js, PostgreSQL, and Redis.

The project is being developed as a practical exercise in building and evolving a full-stack application, with a focus on authentication, caching, background jobs, analytics, API design, and application architecture.

## Overview

The application allows authenticated users to create and manage shortened URLs.

Each URL can have an optional expiration date. When a shortened URL is accessed, the application redirects the user to the original URL and records information about the access for analytics.

The project currently includes:

* User registration and authentication
* URL creation and management
* Short URL redirection
* Optional URL expiration
* Click tracking
* Basic click analytics
* Browser and device information
* Redis caching
* Rate limiting
* Background cleanup jobs
* PostgreSQL persistence
* Docker Compose development environment
* Web dashboard

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* TanStack Query
* React Hook Form
* Zod
* Tailwind CSS
* Recharts
* shadcn/ui

### Backend

* Node.js
* Express
* TypeScript
* Prisma
* PostgreSQL
* Redis
* JWT
* bcrypt
* node-cron
* nanoid
* ua-parser-js

### Infrastructure

* Docker
* Docker Compose

## Architecture

The application is split into separate frontend and backend applications.

```text
url-shortener/
├── backend/
│   ├── prisma/
│   └── src/
│       ├── auth/
│       ├── errors/
│       ├── jobs/
│       ├── lib/
│       ├── middlewares/
│       └── urls/
│
└── frontend/
    └── src/
        ├── actions/
        ├── app/
        ├── components/
        ├── interfaces/
        ├── lib/
        ├── provider/
        ├── schemas/
        └── services/
```

The backend follows a controller, service, and repository structure. Cross-cutting concerns such as authentication, rate limiting, and error handling are handled through middleware.

The frontend uses Next.js App Router and separates application routes, actions, components, services, schemas, and shared utilities.

## Data Model

The main entities are:

* `User` — application users and their credentials
* `Url` — shortened URLs owned by users
* `Click` — access events associated with shortened URLs

Each click can store information such as country, browser, device, and timestamp.

PostgreSQL is used as the primary data store, with Prisma handling database access and migrations.

## Caching and Rate Limiting

Redis is used to reduce database access for URL redirects and to support rate limiting.

The redirect flow can use cached URL data when available, while the database remains the source of persistent data.

Rate limiting is implemented at the API middleware level to prevent excessive requests to the application.

## Background Jobs

The backend uses `node-cron` for scheduled tasks.

One of the current jobs is responsible for cleaning up expired URLs from the database.

## Analytics

The application records click events when shortened URLs are accessed.

The dashboard uses this data to provide information about URL usage, including click counts and a chart-based view of activity.

The collected data currently includes information such as:

* Country
* Browser
* Device
* Timestamp

## Authentication

Authentication is implemented using JWT.

The backend provides registration and login endpoints, while protected URL operations require an authenticated user.

Passwords are stored as hashes using bcrypt rather than being stored directly.

## Running Locally

### Requirements

* Node.js
* Docker
* Docker Compose

### 1. Clone the repository

```bash
git clone https://github.com/ViniciusQuintas/url-shortener.git
cd url-shortener
```

### 2. Start the infrastructure

The backend includes a Docker Compose configuration for PostgreSQL and Redis.

```bash
cd backend
docker compose up -d
```

### 3. Configure environment variables

Create a `.env` file based on `.env.example` in the backend directory.

```bash
cp .env.example .env
```

Configure the required database, Redis, and authentication variables.

### 4. Install backend dependencies

```bash
npm install
```

Run the Prisma migrations:

```bash
npx prisma migrate deploy
```

Start the backend:

```bash
npx tsx src/server.ts
```

### 5. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on port `3001` by default.

## Current Status

The project is under active development.

The core backend functionality, authentication, URL management, caching, rate limiting, expiration handling, background cleanup, and analytics are implemented. The frontend currently provides authentication, URL management, dashboard functionality, and analytics.

Further work includes improving the application, adding additional tests, and completing the remaining production-oriented infrastructure.

## Development History

The project was intentionally developed incrementally rather than being built as a single implementation.

The initial backend was created with Express and gradually evolved as new requirements were introduced.

Some of the main steps in the development history include:

1. Initial Express server
2. Docker Compose and Prisma setup
3. PostgreSQL data model and migrations
4. User registration and authentication
5. Protected API routes
6. URL creation and redirection
7. URL management
8. Error handling middleware
9. Redis caching and rate limiting
10. URL expiration and scheduled cleanup
11. Analytics and click tracking
12. Frontend authentication and dashboard
13. Analytics dashboard

This history is part of the project itself: architectural and technical decisions were made incrementally as the application grew.