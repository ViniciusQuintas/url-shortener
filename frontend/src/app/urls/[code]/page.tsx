import { getOriginalUrlByCode } from "@/services/urls";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ code: string }> | { code: string };
}

export default async function RedirectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { code } = resolvedParams;

  let targetUrl: string | null = null;

  try {
    const data = await getOriginalUrlByCode(code);
    targetUrl = data?.originalUrl || data?.url;
  } catch (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">404 - URL not found</h1>
        <p className="text-gray-500">
          The shortened link provided does not exist or has expired.
        </p>
      </div>
    );
  }

  if (!targetUrl) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">404 - URL not found</h1>
      </div>
    );
  }

  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = `https://${targetUrl}`;
  }

  redirect(targetUrl);
}
