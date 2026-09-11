"use client";

import { useQuery } from "@tanstack/react-query";
import UrlCard from "./url-card";
import { Url } from "@/interfaces/url";
import { getUrlsAction } from "@/actions/urls";

export default function UrlList() {
  const { data = [] } = useQuery<Url[]>({
    queryKey: ["urls"],
    queryFn: getUrlsAction,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-10 px-4 sm:px-8 lg:px-20">
      {data.map((url: Url) => (
        <UrlCard key={url.id} url={url} />
      ))}
    </div>
  );
}
