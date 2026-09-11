const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    if (contentType?.includes("application/json")) {
      const error = await res.json();
      throw new Error(error.message ?? "Something went wrong");
    }

    throw new Error("Something went wrong");
  }

  if (!contentType?.includes("application/json")) {
    return null;
  }

  return res.json();
}
