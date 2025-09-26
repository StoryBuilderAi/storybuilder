# StoryBuilder Server

Express server for the StoryBuilder application built with TypeScript.

## Features

- Express.js with TypeScript
- CORS enabled
- Security headers with Helmet
- Request logging with Morgan
- Environment variable support
- Health check endpoint
- Error handling middleware
- Structured folder organization
- Custom logging utility
- Validation utilities
- Service layer architecture

## Project Structure

```
src/
├── db/                 # Database configuration
│   ├── schema.ts       # Main schema exports
│   ├── index.ts        # Database connection
│   └── schemas/        # Individual table schemas
│       ├── users.ts
│       ├── resumes.ts
│       ├── resumeAnalyses.ts
│       ├── jobs.ts
│       ├── jobApplications.ts
│       ├── sessions.ts
│       └── index.ts    # Schema exports
├── middleware/         # Express middleware
│   ├── errorHandler.ts # Error handling middleware
│   ├── auth.ts        # Authentication middleware
│   └── index.ts       # Middleware exports
├── services/          # Business logic services
│   ├── userService.ts # User management service
│   └── index.ts       # Service exports
├── utils/             # Utility functions
│   ├── logger.ts      # Custom logging utility
│   ├── validation.ts  # Validation helpers
│   └── index.ts       # Utility exports
└── index.ts           # Main server file
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp env.example .env
```

3. Update the `.env` file with your configuration.

4. Set up PostgreSQL database:
   - Create a PostgreSQL database
   - Update the `DATABASE_URL` in your `.env` file
   - Run database migrations:
   ```bash
   npm run db:generate
   npm run db:push
   ```

## Development

Start the development server with hot reload:
```bash
npm run dev
```

## Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm start` - Start the production server
- `npm run clean` - Clean the dist folder
- `npm run type-check` - Run TypeScript type checking

### Database Scripts

- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:drop` - Drop all tables (⚠️ destructive)

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/hello` - Sample API endpoint
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `LOG_LEVEL` - Logging level (error, warn, info, debug)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens

## Architecture

The server follows a clean architecture pattern:

- **Database**: Drizzle ORM with PostgreSQL for data persistence
- **Middleware**: Express middleware for cross-cutting concerns
- **Services**: Business logic and data access layer
- **Utils**: Reusable utility functions and helpers
- **Types**: TypeScript interfaces and type definitions

This structure makes the codebase maintainable, testable, and scalable.

## Database Schema

The application includes the following tables:
- **users**: User accounts and authentication
- **resumes**: Resume file storage and metadata
- **resume_analyses**: AI analysis results for resumes
- **jobs**: Job postings and requirements
- **job_applications**: Job application tracking
- **sessions**: User session management
