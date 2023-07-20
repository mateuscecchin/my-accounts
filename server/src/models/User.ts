import { User as PrismaUser } from "@prisma/client";
import { prisma } from "../libs/prisma";

export class User {
  static async create(userData: PrismaUser) {
    return prisma.user.create({
      data: userData,
    });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}