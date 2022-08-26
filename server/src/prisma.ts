import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    // visualizar operação realizadas no banco de dados
    log: ['query'],
});