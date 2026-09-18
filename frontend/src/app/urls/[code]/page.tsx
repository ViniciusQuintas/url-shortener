import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function RedirectPage({ params }: PageProps) {
  const { code } = await params;

  const baseUrl = process.env.API_URL;

  if (!baseUrl) {
    throw new Error("API_URL is not configured");
  }

  const response = await fetch(`${baseUrl}/urls/${code}`, {
    method: "GET",
    redirect: "manual",
    cache: "no-store",
  });

  if (response.status === 404) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">404 - URL not found</h1>
        <p className="text-gray-500">
          The shortened link provided does not exist or has expired.
        </p>
      </div>
    );
  }

  if (response.status === 410) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">410 - URL expired</h1>
        <p className="text-gray-500">
          The shortened link provided has expired.
        </p>
      </div>
    );
  }

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");

    if (!location) {
      throw new Error("Redirect response did not contain a Location header");
    }

    redirect(location);
  }

  throw new Error(`Unexpected response from URL service: ${response.status}`);
}
