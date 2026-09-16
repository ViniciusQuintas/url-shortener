import { getUrlsAnalyticsAction } from "@/actions/urls";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { Analytic } from "@/interfaces/url";
import { format } from "date-fns";
import { MousePointerClick, TrendingUp, CalendarDays } from "lucide-react";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data: Analytic[] = await getUrlsAnalyticsAction(id);

  const dataFormatDate: Analytic[] = [...data]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      ...item,
      date: format(new Date(item.date), "dd/MM/yyyy"),
    }));

  const totalClicks = data.reduce((total, item) => total + item.clicks, 0);

  const averageClicks =
    data.length > 0 ? Math.round(totalClicks / data.length) : 0;

  const peakClicks =
    data.length > 0 ? Math.max(...data.map((item) => item.clicks)) : 0;

  return (
    <main className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-base-content/60">
                  Total clicks
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {totalClicks.toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <MousePointerClick size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-base-content/60">
                  Daily average
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {averageClicks.toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="rounded-xl bg-success/10 p-3 text-success">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-base-content/60">
                  Peak clicks
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {peakClicks.toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="rounded-xl bg-warning/10 p-3 text-warning">
                <CalendarDays size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <section className="card border border-base-300 bg-base-100 shadow-sm mt-5">
        <div className="card-body p-4 sm:p-6">
          <div className="mb-6">
            <h2 className="card-title text-xl">Clicks over time</h2>

            <p className="text-sm text-base-content/60">
              View of clicks recorded per day.
            </p>
          </div>

          {dataFormatDate.length > 0 ? (
            <AnalyticsChart data={dataFormatDate} />
          ) : (
            <div className="flex min-h-[350px] items-center justify-center">
              <div className="text-center">
                <MousePointerClick
                  size={40}
                  className="mx-auto mb-3 text-base-content/30"
                />

                <h3 className="font-semibold">No data available</h3>

                <p className="mt-1 text-sm text-base-content/60">
                  There are no clicks registered for this link yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
