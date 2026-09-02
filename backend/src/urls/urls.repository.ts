import { prisma } from "../lib/prisma";

export async function create(data: {
  code: string;
  originalUrl: string;
  userId: string;
  expiresAt: Date;
}) {
  const url = await prisma.url.create({ data });
  return url;
}
