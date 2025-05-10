'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

// Sample data
const chartData = [
  { name: 'Inadimplência', value: 400, color: "hsl(var(--chart-1))", fill: "hsl(var(--chart-1))" }, 
  { name: 'Cancelamentos', value: 300, color: "hsl(var(--chart-2))", fill: "hsl(var(--chart-2))" }, 
  { name: 'Custos Fixos Elevados', value: 150, color: "hsl(var(--chart-3))", fill: "hsl(var(--chart-3))" }, 
  { name: 'Descontos Excessivos', value: 100, color: "hsl(var(--chart-4))", fill: "hsl(var(--chart-4))" }, 
  { name: 'Outros', value: 50, color: "hsl(var(--chart-5))", fill: "hsl(var(--chart-5))" }, 
];

const chartConfig = {
  inadimplencia: { label: 'Inadimplência', color: "hsl(var(--chart-1))" },
  cancelamentos: { label: 'Cancelamentos', color: "hsl(var(--chart-2))" },
  custosFixos: { label: 'Custos Fixos Elevados', color: "hsl(var(--chart-3))" },
  descontos: { label: 'Descontos Excessivos', color: "hsl(var(--chart-4))" },
  outros: { label: 'Outros', color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
  value: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomizedLabelProps): ReactNode => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7; // Adjust label position within slice
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent * 100 < 5) return null; // Don't render label for very small slices

  return (
    <text
      x={x}
      y={y}
      fill="hsl(var(--popover-foreground))" // Use popover-foreground for good contrast in both themes
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="10px"
      className="font-sans pointer-events-none"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export default function LossDistributionChart() {
  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="font-sans">Distribuição de Causas de Perdas</CardTitle>
        <CardDescription className="font-sans">Principais fatores de impacto negativo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip 
                  cursor={false}
                  content={<ChartTooltipContent hideLabel className="font-sans" />} 
                  wrapperStyle={{ outline: "none" }}
                />
                <Legend content={({ payload }) => (
                  <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4 text-xs text-foreground font-sans">
                    {payload?.map((entry, index) => (
                      <li key={`item-${index}`} className="flex items-center">
                        <span style={{ backgroundColor: entry.color, width: '10px', height: '10px', marginRight: '5px', display: 'inline-block', borderRadius: '50%' }}></span>
                        {entry.payload?.name} (R$ {entry.payload?.value.toLocaleString('pt-BR')})
                      </li>
                    ))}
                  </ul>
                )} />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  innerRadius={60} // For donut chart
                  dataKey="value"
                  paddingAngle={2}
                  stroke="hsl(var(--border))" // Add a border to slices for better separation
                >
                  {chartData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
