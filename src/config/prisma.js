const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

// 1. Create a PostgreSQL connection pool
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. Initialize the Prisma Driver Adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the PrismaClient
const prisma = new PrismaClient({
  adapter: adapter, // This is the key fix
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

module.exports = prisma;