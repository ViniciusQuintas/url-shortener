import { apiFetch } from "@/app/lib/api";
import { cookies } from "next/headers";

export async function getUrls() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await apiFetch("/urls", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.urls;
}

export async function createUrl(data: {
  originalUrl: string;
  expiresAt?: string;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await apiFetch("/urls", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function deleteUrl(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await apiFetch(`/urls/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function getUrlAnalytics(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await apiFetch(`/urls/${id}/analytics`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.analytics;
}

export async function getOriginalUrlByCode(code: string) {
  const response = await apiFetch(`/urls/${code}`, {
    method: "GET",
    cache: "no-store",
  });

  return response;
}
