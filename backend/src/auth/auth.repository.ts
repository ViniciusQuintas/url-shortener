import { prisma } from "../lib/prisma";

export async function findByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function create(data: {
  name: string;
  email: string;
  passwordHash: string;
}) {
  const user = await prisma.user.create({
    data,
  });

  return user;
}
