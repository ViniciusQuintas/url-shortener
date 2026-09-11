import { apiFetch } from "@/app/lib/api";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const cookieStore = await cookies();

    cookieStore.set("token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: error instanceof Error ? error.message : "Login failed" },
      { status: 401 },
    );
  }
}
