import { create } from "./urls.repository";
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
