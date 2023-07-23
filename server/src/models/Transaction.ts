import { Transaction as PrismaTransaction } from "@prisma/client";
import { prisma } from "../libs/prisma";

export class Transaction {
  async create(data: PrismaTransaction) {
    return prisma.transaction.create({
      data,
    });
  }

  async getByUserId(userId: string) {
    return prisma.transaction.findMany({
      where: {
        userId,
      },
    });
  }

  async delete(id: string) {
    return prisma.transaction.delete({
      where: {
        id
      },
    });
  }
}
