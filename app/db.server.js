import { PrismaClient } from "@prisma/client";

// This prevents Vercel/Serverless from creating a new Prisma instance on every single request
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
