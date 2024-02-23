import { PrismaClient } from '@prisma/client'

let prismaClient: PrismaClient;

declare global {
   let prisma: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
   prisma = new PrismaClient();
} else {
   if (!global.prisma) {
      global.prisma = new PrismaClient();
   }
   prisma = global.prisma;
   prisma.$connect();
}

export { prisma };