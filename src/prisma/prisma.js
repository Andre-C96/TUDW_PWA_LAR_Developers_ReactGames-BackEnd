const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { neonConfig, Pool } = require('@neondatabase/serverless');
const ws = require('ws');

// Esto es necesario para que el pooler de Neon funcione correctamente en entornos Node serverless
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set to connect to the database');
}

// Usamos el Pool optimizado de Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;