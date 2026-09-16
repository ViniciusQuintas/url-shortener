"use client";

import { useQuery } from "@tanstack/react-query";
import UrlCard from "./url-card";
import { Url } from "@/interfaces/url";
import { getUrlsAction } from "@/actions/urls";
import { Link, Clock } from "lucide-react";

export default function UrlList() {
  const { data = [] } = useQuery<Url[]>({
    queryKey: ["urls"],
    queryFn: getUrlsAction,
  });

  const now = new Date();

  // Início e fim da semana atual
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const activeUrls = data.filter(
    (url) => !url.expiresAt || new Date(url.expiresAt) > now,
  );

  const expiringThisWeek = data.filter((url) => {
    if (!url.expiresAt) return false;

    const expiresAt = new Date(url.expiresAt);

    return expiresAt >= startOfWeek && expiresAt < endOfWeek;
  });

  const metrics = [
    {
      label: "Total number of active URLs",
      value: activeUrls.length,
      icon: Link,
      color: "text-primary",
      background: "bg-primary/10",
    },
    {
      label: "URLs that expire this week",
      value: expiringThisWeek.length,
      icon: Clock,
      color: "text-warning",
      background: "bg-warning/10",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 px-4 pt-6 sm:grid-cols-3 sm:px-8 lg:px-20">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="card border border-neutral bg-base-100 shadow-sm"
            >
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-base-content/60">
                      {metric.label}
                    </p>

                    <p className="mt-2 text-3xl font-bold">{metric.value}</p>
                  </div>

                  <div
                    className={`rounded-xl p-3 ${metric.background} ${metric.color}`}
                  >
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-20">
        {data.map((url: Url) => (
          <UrlCard key={url.id} url={url} />
        ))}
      </div>
    </div>
  );
}
