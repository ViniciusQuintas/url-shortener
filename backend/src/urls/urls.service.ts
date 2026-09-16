import { AppError } from "../errors/AppError";
import { redis } from "../lib/redis";
import {
  create,
  deleteManyUrls,
  deleteUrl,
  findById,
  getAnalytics,
  getUrlByCode,
  listUrls,
  registerClick,
} from "./urls.repository";
import { nanoid } from "nanoid";

export async function createUrl(
  originalUrl: string,
  userId: string,
  expiresAt?: Date,
) {
  const code = nanoid(6);

  return await create({ code, originalUrl, userId, expiresAt });
}

export async function getUrl(code: string) {
  const url = await getUrlByCode(code);

  if (!url) {
    throw new AppError("URL not found", 404);
  }

  return url;
}

export async function newclick(data: {
  urlid: string;
  country: string;
  browser: string;
  device: string;
}) {
  return await registerClick(data);
}

export async function getAllUrls(userId: string) {
  return await listUrls(userId);
}

export async function deleteUrlById(urlid: string, code: string) {
  await deleteUrl(urlid);
  return await redis.del(`url:${code}`);
}

export async function getUrlById(id: string) {
  const url = await findById(id);
  if (!url) {
    throw new AppError("URL not found", 404);
  }

  return url;
}

export async function deleteExpiresUrls() {
  return await deleteManyUrls();
}

export async function getAnalyticsById(urlId: string, userId: string) {
  const url = await getUrlById(urlId);

  if (url.userId != userId) {
    throw new AppError("Forbidden", 403);
  }

  return await getAnalytics(urlId);
}
