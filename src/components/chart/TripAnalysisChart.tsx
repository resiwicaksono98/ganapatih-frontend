import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";
import { fetchDiagramMonthlyTrip } from "../../api/trips";

export default function TripAnalysisChart() {
  const [aggregatedData, setAggregatedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrips() {
      try {
        const trips = await fetchDiagramMonthlyTrip();
        const sortedTrips = trips.monthlyTotals.sort(
          (a: { month: string }, b: { month: string }) =>
            new Date(a.month).getTime() - new Date(b.month).getTime()
        );
        setAggregatedData(sortedTrips);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTrips();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ChartContainer
      config={{
        totalTrip: {
          label: "Total Trip",
          color: "hsl(var(--chart-1))"
        },
        totalPaymentTypeCash: {
          label: "Total Payment Type Cash",
          color: "hsl(var(--chart-2))"
        },
        totalPaymentTypeCRD: {
          label: "Total Payment Type CRD",
          color: "hsl(var(--chart-3))"
        }
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={aggregatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="totalTrips"
            fill="hsl(var(--chart-1))"
            name="Total Trip"
          />
          <Bar
            yAxisId="right"
            dataKey="totalPaymentTypeCSH"
            fill="hsl(var(--chart-2))"
            name="Payment Cash"
          />
          <Bar
            yAxisId="right"
            dataKey="totalPaymentTypeCRD"
            fill="hsl(var(--chart-3))"
            name="Payment Credit"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
