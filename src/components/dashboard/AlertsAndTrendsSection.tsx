import AlertsTable from './AlertsTable';

export default function AlertsAndTrendsSection() {
  return (
    <section aria-labelledby="alerts-trends-title">
      {/* The title is inside AlertsTable's CardHeader, so h2 might be redundant unless a section overview is needed. */}
      {/* <h2 id="alerts-trends-title" className="text-xl font-semibold text-foreground mb-4 font-sans">
        Alertas e Tendências
      </h2> */}
      <AlertsTable />
    </section>
  );
}
