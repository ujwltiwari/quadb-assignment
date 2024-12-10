import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { title: "5k", desktop: 5000, mobile: 2000 },
  { title: "10k", desktop: 8000, mobile: 4000 },
  { title: "15k", desktop: 12000, mobile: 7000 },
  { title: "20k", desktop: 15000, mobile: 10000 },
  { title: "25k", desktop: 13000, mobile: 9000 },
  { title: "30k", desktop: 18000, mobile: 11000 },
  { title: "35k", desktop: 16000, mobile: 14000 },
  { title: "40k", desktop: 20000, mobile: 17000 },
  { title: "45k", desktop: 22000, mobile: 15000 },
  { title: "50k", desktop: 25000, mobile: 20000 },
  { title: "55k", desktop: 23000, mobile: 19000 },
  { title: "60k", desktop: 27000, mobile: 21000 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

const SalesDetails = () => {
  return (
    <Card>
      <CardHeader>
        <h6 className="text-[24px] text-left">Sales Details</h6>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesDetails;
