"use server";
import {
  createUrl,
  deleteUrl,
  getUrlAnalytics,
  getUrls,
} from "@/services/urls";

export async function getUrlsAction() {
  return await getUrls();
}

export async function createUrlAction(data: {
  originalUrl: string;
  expiresAt?: string;
}) {
  return await createUrl(data);
}

export async function deleteUrlAction(id: string) {
  await deleteUrl(id);
}

export async function getUrlsAnalyticsAction(id: string) {
  return await getUrlAnalytics(id);
}
