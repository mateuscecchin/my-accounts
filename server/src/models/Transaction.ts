import { Transaction as PrismaTransaction } from "@prisma/client";
import { prisma } from "../libs/prisma";

export class Transaction {
    static async create(transactionData: PrismaTransaction) {
      return prisma.transaction.create({
        data: transactionData,
      });
    }
    
  static async getByUserId(userId: string) {
    return prisma.transaction.findMany({
      where: {
        user_id: userId,
      },
    });
  }

}   