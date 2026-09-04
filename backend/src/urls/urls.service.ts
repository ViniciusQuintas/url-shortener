import { AppError } from "../errors/AppError";
import {
  create,
  deleteUrl,
  findById,
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
  expiresAt = expiresAt ?? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

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

export async function deleteUrlById(urlid: string) {
  return await deleteUrl(urlid);
}

export async function getUrlById(id: string) {
  const url = await findById(id);
  if (!url) {
    throw new AppError("URL not found", 404);
  }

  return url;
}
