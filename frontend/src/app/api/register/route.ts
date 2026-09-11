import { apiFetch } from "@/app/lib/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: error instanceof Error ? error.message : "Register failed" },
      { status: 401 },
    );
  }
}
