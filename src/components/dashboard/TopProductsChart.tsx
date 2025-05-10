// @ts-nocheck
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

// Sample data - now represents costs
const chartData = [
  { product: 'Produto A', costs: 15000, nameKey: 'prodA' },
  { product: 'Serviço X', costs: 12800, nameKey: 'servX' },
  { product: 'Produto B', costs: 10500, nameKey: 'prodB' },
  { product: 'Consultoria Y', costs: 8200, nameKey: 'consY' },
  { product: 'Produto C', costs: 4000, nameKey: 'prodC' },
].sort((a, b) => a.costs - b.costs); // Sort ascending: smallest cost at bottom, largest at top for horizontal bars

const chartConfig = {
  costs: { label: "Custos", color: "hsl(var(--chart-1))" }, // Single color for bars
  prodA: { label: 'Produto A', color: "hsl(var(--chart-1))" }, // Color for Y-axis label
  servX: { label: 'Serviço X', color: "hsl(var(--chart-2))" }, // Color for Y-axis label
  prodB: { label: 'Produto B', color: "hsl(var(--chart-3))" }, // Color for Y-axis label
  consY: { label: 'Consultoria Y', color: "hsl(var(--chart-4))" }, // Color for Y-axis label
  prodC: { label: 'Produto C', color: "hsl(var(--chart-5))" }, // Color for Y-axis label
} satisfies ChartConfig;


const CustomYAxisTick = (props: any) => {
  const { x, y, payload, index } = props;
  // Find the chartData item corresponding to payload.value (product name)
  const dataEntry = chartData.find(item => item.product === payload.value);
  
  // Determine color for the tick
  // Ensure chartConfig and dataEntry.nameKey are valid before accessing color
  let color = 'hsl(var(--muted-foreground))'; // Default fallback color
  if (dataEntry && dataEntry.nameKey && chartConfig[dataEntry.nameKey as keyof typeof chartConfig]) {
    const configEntry = chartConfig[dataEntry.nameKey as keyof typeof chartConfig];
    if (configEntry && configEntry.color) {
      color = configEntry.color;
    }
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={4} // Offset for vertical alignment
        textAnchor="end"
        fill={color}
        fontSize={12}
        fontWeight="bold"
        className="font-sans"
      >
        {payload.value}
      </text>
    </g>
  );
};


export default function TopProductsChart() {
  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="font-sans">Top 5 Produtos/Serviços por Custos</CardTitle>
        <CardDescription className="font-sans">Maiores custos por produto/serviço</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={chartData} margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis 
                  type="number" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickFormatter={(value) => `R$${value / 1000}k`}
                  className="font-sans"
                />
                <YAxis 
                  dataKey="product" 
                  type="category" 
                  width={100} 
                  tickLine={false}
                  axisLine={false}
                  tick={<CustomYAxisTick />} // Use custom colored ticks
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.3 }} 
                  content={<ChartTooltipContent 
                              className="font-sans" 
                              labelClassName="font-sans" 
                              formatter={(value, name, item) => {
                                if (name === 'costs' && item.payload) {
                                  const costValueFormatted = `R$${Number(value).toLocaleString('pt-BR')}`;
                                  const dataKeyLabel = chartConfig.costs?.label || name;
                                  return [costValueFormatted, dataKeyLabel]; // [VALUE, NAME_OF_DATAKEY]
                                }
                                return [`${value}`, name];
                              }} 
                            />}
                  wrapperStyle={{ outline: "none" }}
                />
                <Legend content={() => (
                  <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4 text-xs text-foreground font-sans">
                    <li className="flex items-center">
                      <span style={{ backgroundColor: chartConfig.costs.color, width: '10px', height: '10px', marginRight: '5px', display: 'inline-block', borderRadius: '2px' }}></span>
                      {chartConfig.costs.label || 'Custos'}
                    </li>
                  </ul>
                )} />
                <Bar dataKey="costs" radius={[0, 4, 4, 0]} barSize={20} fill="var(--color-costs)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

