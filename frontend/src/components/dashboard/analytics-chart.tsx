"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Analytic } from "@/interfaces/url";

interface ChartProps {
  data: Analytic[];
}

export function AnalyticsChart({ data }: ChartProps) {
  return (
    <div className="h-87.5 w-full sm:h-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 15, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            dy={10}
            stroke="#64748b"
            style={{ fontSize: "12px" }}
            minTickGap={20}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            dx={-5}
            stroke="#64748b"
            style={{ fontSize: "12px" }}
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              borderColor: "#e2e8f0",
            }}
            labelStyle={{ fontWeight: "bold", color: "#1e293b" }}
          />

          <Legend verticalAlign="top" height={36} />

          <Line
            name="Number of Clicks"
            type="monotone"
            dataKey="clicks"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
