import RevenueCostsChart from './RevenueCostsChart';
import TopProductsChart from './TopProductsChart';
import LossDistributionChart from './LossDistributionChart';

export default function MainVisualizationsSection() {
  return (
    <section aria-labelledby="main-visualizations-title">
      <h2 id="main-visualizations-title" className="text-xl font-semibold text-foreground mb-4 font-sans">
        Visualizações Principais
      </h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueCostsChart />
        <TopProductsChart />
        <div className="lg:col-span-2"> {/* Donut chart can span full width on large, or be part of a 3-col layout */}
          <LossDistributionChart />
        </div>
      </div>
    </section>
  );
}
