'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

// Sample data for the last 12 months
const chartData = [
  { month: 'Jan', receita: 4000, custos: 2400 },
  { month: 'Fev', receita: 3000, custos: 1398 },
  { month: 'Mar', receita: 2000, custos: 7800 }, // Intentional high cost for demo
  { month: 'Abr', receita: 2780, custos: 3908 },
  { month: 'Mai', receita: 1890, custos: 4800 },
  { month: 'Jun', receita: 2390, custos: 3800 },
  { month: 'Jul', receita: 3490, custos: 4300 },
  { month: 'Ago', receita: 3700, custos: 2800 },
  { month: 'Set', receita: 4100, custos: 3100 },
  { month: 'Out', receita: 4500, custos: 3300 },
  { month: 'Nov', receita: 4200, custos: 3000 },
  { month: 'Dez', receita: 5100, custos: 3500 },
];

const chartConfig = {
  receita: {
    label: "Receita",
    color: "hsl(var(--chart-1))", // Light Blue
  },
  custos: {
    label: "Custos",
    color: "hsl(var(--chart-2))", // Yellow
  },
} satisfies ChartConfig;


export default function RevenueCostsChart() {
  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="font-sans">Receita vs. Custos</CardTitle>
        <CardDescription className="font-sans">Últimos 12 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: -20, // Adjusted for Y-axis labels
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  className="font-sans"
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `R$${value / 1000}k`}
                  className="font-sans"
                />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" labelClassName="font-sans" className="font-sans" />}
                  wrapperStyle={{ outline: "none" }}
                />
                <Legend content={({ payload }) => (
                  <ul className="flex justify-center gap-4 mt-4">
                    {payload?.map((entry, index) => (
                      <li key={`item-${index}`} className="flex items-center text-xs text-foreground font-sans">
                        <span style={{ backgroundColor: entry.color, width: '10px', height: '10px', marginRight: '5px', display: 'inline-block', borderRadius: '50%' }}></span>
                        {entry.value === 'receita' ? 'Receita' : 'Custos'}
                      </li>
                    ))}
                  </ul>
                )} />
                <Line
                  type="monotone"
                  dataKey="receita"
                  stroke={chartConfig.receita.color}
                  strokeWidth={2}
                  dot={{ r: 4, fill: chartConfig.receita.color, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="custos"
                  stroke={chartConfig.custos.color}
                  strokeWidth={2}
                  dot={{ r: 4, fill: chartConfig.custos.color, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
