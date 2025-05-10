import AppHeader from '@/components/layout/AppHeader';
import FinancialSummarySection from '@/components/dashboard/FinancialSummarySection';
import MainVisualizationsSection from '@/components/dashboard/MainVisualizationsSection';
import AlertsAndTrendsSection from '@/components/dashboard/AlertsAndTrendsSection';

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AppHeader />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-background">
        <FinancialSummarySection />
        <MainVisualizationsSection />
        <AlertsAndTrendsSection />
      </main>
    </div>
  );
}
