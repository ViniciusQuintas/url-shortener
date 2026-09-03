import { create, getUrlByCode, registerClick } from "./urls.repository";
import { nanoid } from "nanoid";

export async function createUrl(
  originalUrl: string,
  userId: string,
  expiresAt?: Date,
) {
  const code = nanoid(6);
  expiresAt = expiresAt ?? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return await create({ code, originalUrl, userId, expiresAt });
}

export async function getUrl(code: string) {
  return await getUrlByCode(code);
}

export async function newclick(data: {
  urlid: string;
  country: string;
  browser: string;
  device: string;
}) {
  return await registerClick(data);
}
