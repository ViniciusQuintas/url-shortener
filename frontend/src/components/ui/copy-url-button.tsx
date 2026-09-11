"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyUrlButtonProps {
  url: string;
}

export default function CopyUrlButton({ url }: CopyUrlButtonProps) {
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <Copy
      className="text-primary cursor-pointer hover:opacity-60"
      onClick={copyUrl}
    />
  );
}
