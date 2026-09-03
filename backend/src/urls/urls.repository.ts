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

export async function getUrlByCode(code: string) {
  const url = await prisma.url.findUnique({ where: { code } });
  return url;
}

export async function registerClick(data: {
  urlid: string;
  country: string;
  browser: string;
  device: string;
}) {
  const click = await prisma.click.create({ data });
  return click;
}
