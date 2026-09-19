"use client";

import { ChartNoAxesCombined, Copy } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { toast } from "sonner";
import DeleteUrlButton from "./delete-url-button";

interface UrlCardProps {
  url: {
    id: string;
    code: string;
    originalUrl: string;
    expiresAt?: string | null;
  };
}

export default function UrlCard({ url }: UrlCardProps) {
  const shortUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${url.code}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    toast.success("URL copied to clipboard");
  };

  return (
    <div className="card w-full min-w-0 bg-neutral card-sm shadow-sm p-6">
      <div className="flex items-start justify-between gap-4">
        <Link
          href={shortUrl}
          target="_blank"
          className="font-semibold min-w-0 break-all hover:underline hover:text-primary"
        >
          {shortUrl}
        </Link>

        <div className="flex shrink-0 gap-3">
          <Link href={`/dashboard/${url.id}`}>
            <ChartNoAxesCombined className="size-5 text-warning hover:opacity-60 cursor-pointer" />
          </Link>
          <button onClick={handleCopy}>
            <Copy className="size-5 text-primary hover:opacity-60 cursor-pointer" />
          </button>

          <DeleteUrlButton id={url.id} />
        </div>
      </div>

      <div className="divider" />

      <div className="min-w-0">
        <h3 className="break-words">
          <span className="font-semibold">Original URL:</span> {url.originalUrl}
        </h3>
      </div>

      {url.expiresAt && (
        <div className="mt-4">
          <h3>
            <span className="font-semibold">Expires At:</span>{" "}
            {format(new Date(url.expiresAt), "MM/dd/yyyy")}
          </h3>
        </div>
      )}
    </div>
  );
}
