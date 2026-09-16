// @/components/AnalyticsChart.tsx
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
          margin={{ top: 15, right: 20, left: -10, bottom: 5 }} // Pequeno ajuste de margem
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          {/* Eixo X: Evita sobreposição de textos se houver muitas datas */}
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            dy={10}
            stroke="#64748b"
            style={{ fontSize: "12px" }}
            minTickGap={20} // Pula datas automaticamente se faltar espaço
          />

          {/* Eixo Y: Garante apenas números inteiros e remove linhas desnecessárias */}
          <YAxis
            tickLine={false}
            axisLine={false}
            dx={-5}
            stroke="#64748b"
            style={{ fontSize: "12px" }}
            allowDecimals={false} // IMPEDE cliques quebrados como 1.5 ou 2.8
          />

          {/* Customização do Balão ao passar o mouse */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              borderColor: "#e2e8f0",
            }}
            labelStyle={{ fontWeight: "bold", color: "#1e293b" }}
          />

          <Legend verticalAlign="top" height={36} />

          {/* Linha do Gráfico principal */}
          <Line
            name="Number of Clicks" // Nome amigável na legenda e tooltip
            type="monotone"
            dataKey="clicks"
            stroke="#2563eb"
            strokeWidth={2} // Linha levemente mais grossa para melhor legibilidade
            dot={{ r: 4, strokeWidth: 2 }} // Pontos visíveis em cada dia
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
