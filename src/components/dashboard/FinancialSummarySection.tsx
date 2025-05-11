import FinancialCard from './FinancialCard';
import { TrendingUp, TrendingDown, DollarSign, Percent, AlertTriangle, Users } from 'lucide-react';

export default function FinancialSummarySection() {
  // Placeholder data - replace with actual data fetching
  const summaryData = [
    {
      title: 'Lucro Líquido Mensal',
      value: 'R$ 45.231,89',
      icon: DollarSign,
      trend: 'up' as const,
      trendDescription: '+20.1% vs. mês anterior',
    },
    {
      title: 'Receita Recorrente (MRR)',
      value: 'R$ 272.300',
      icon: TrendingUp,
      trend: 'up' as const,
      trendDescription: '+5.2% tendência de crescimento',
    },
    {
      title: 'Custos Operacionais',
      value: 'R$ 58.750',
      icon: AlertTriangle,
      trend: 'neutral' as const, // Or 'down' if it's bad, 'up' if costs are increasing badly
      trendDescription: 'Estável (dentro do esperado)', // Example: 'Alerta: +10% acima do orçado'
    },
    {
      title: 'Churn Rate',
      value: '3.8%',
      icon: Users, // Using Users, could be Percent if more appropriate for "rate"
      trend: 'down' as const, // Lower churn is good
      trendDescription: '+0.5% vs. trimestre anterior',
    },
  ];

  return (
    <section aria-labelledby="financial-summary-title">
      <h2 id="financial-summary-title" className="text-xl font-semibold text-foreground mb-4 font-sans">
        Resumo Financeiro
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item) => (
          <FinancialCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            trend={item.trend}
            trendDescription={item.trendDescription}
          />
        ))}
      </div>
    </section>
  );
}
