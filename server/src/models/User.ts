import { User as PrismaUser } from "@prisma/client";
import { prisma } from "../libs/prisma";

export class User {
  async create(data: PrismaUser) {
    return prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}
