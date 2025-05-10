import type { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FinancialCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendDescription?: string;
  className?: string;
}

export default function FinancialCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendDescription,
  className,
}: FinancialCardProps) {
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-muted-foreground';

  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-card-foreground font-sans">{title}</CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-card-foreground font-sans">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground pt-1 font-sans">{description}</p>
        )}
        {trendDescription && (
          <p className={cn("text-xs pt-1 font-sans", trendColor)}>{trendDescription}</p>
        )}
      </CardContent>
    </Card>
  );
}
