# Invoices Server

This is a NestJS-based server for managing invoices. It includes user authentication, invoice management, and database seeding.

## Setup

1. Install dependencies:
   npm install

2. Setup env file
   DATABASE_URL=postgresql://postgres:postgres@localhost:5433/invoices

3. Run the database migrations:
   npx prisma migrate dev
   npx prisma db push
   npx prisma generate

4. Seed the database:
   npm run seed

5. Start the server:  
    npm run start:dev

   ## Authentication

   POST /auth/login: Login with email and password.
   Users
   POST /users/register: Register a new user.
   Invoices
   GET /invoices: Get all invoices.
   GET /invoices/total: Get the total amount of all invoices.
   GET /invoices/:id: Get a specific invoice by ID.
