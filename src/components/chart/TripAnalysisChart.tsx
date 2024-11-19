
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

import { aggregatedData } from "../../data/aggregatedData";

export default function TripAnalysisChart() {
  return (
    <ChartContainer
      config={{
        avgFare: {
          label: "Rata-rata Tarif",
          color: "hsl(var(--chart-1))"
        },
        tripCount: {
          label: "Jumlah Perjalanan",
          color: "hsl(var(--chart-2))"
        }
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={aggregatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="avgFare"
            stroke="var(--color-avgFare)"
            name="Rata-rata Tarif"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="tripCount"
            stroke="var(--color-tripCount)"
            name="Jumlah Perjalanan"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
