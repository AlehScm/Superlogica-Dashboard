'use client';

import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type AlertCategory = 'Financeiro' | 'Clientes' | 'Operacional' | 'Todos';

interface AlertItem {
  id: string;
  description: string;
  category: AlertCategory;
  date: string; // Format: DD/MM/YYYY
  severity: 'Crítico' | 'Alto' | 'Médio';
}

const allAlerts: AlertItem[] = [
  { id: '1', description: 'Cliente XPTO com fatura vencida há 15 dias', category: 'Financeiro', date: '20/03/2025', severity: 'Crítico' },
  { id: '2', description: 'Custo com Servidor AWS 20% acima do orçamento', category: 'Operacional', date: '18/01/2025', severity: 'Alto' },
  { id: '3', description: 'Taxa de abertura de chamados de suporte aumentou 30%', category: 'Clientes', date: '15/02/2025', severity: 'Médio' },
  { id: '4', description: 'Renovação de contrato grande pendente (Empresa Y)', category: 'Clientes', date: '10/01/2025', severity: 'Crítico' },
  { id: '5', description: 'Fluxo de caixa projetado negativo para próxima semana', category: 'Financeiro', date: '21/04/2025', severity: 'Alto' },
];

const getSeverityBadgeVariant = (severity: AlertItem['severity']): "destructive" | "default" | "secondary" => {
  switch (severity) {
    case 'Crítico': return 'destructive';
    case 'Alto': return 'default'; 
    case 'Médio': return 'secondary';
    default: return 'secondary';
  }
};

export default function AlertsTable() {
  const [filter, setFilter] = useState<AlertCategory>('Todos');

  const filteredAlerts = filter === 'Todos'
    ? allAlerts
    : allAlerts.filter(alert => alert.category === filter);

  const categories: AlertCategory[] = ['Todos', 'Financeiro', 'Clientes', 'Operacional'];

  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="font-sans">Alertas e Tendências</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(category)}
              className={cn("font-sans", filter === category ? "bg-primary text-primary-foreground" : "text-foreground border-border hover:bg-accent hover:text-accent-foreground")}
            >
              {category}
            </Button>
          ))}
        </div>
        {filteredAlerts.length > 0 ? (
          <Table>
            <TableCaption className="font-sans">Lista de alertas críticos e tendências importantes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-sans text-muted-foreground">Descrição</TableHead>
                <TableHead className="font-sans text-muted-foreground hidden md:table-cell">Categoria</TableHead>
                <TableHead className="font-sans text-muted-foreground hidden sm:table-cell">Data</TableHead>
                <TableHead className="font-sans text-muted-foreground text-right">Severidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium font-sans text-foreground">{alert.description}</TableCell>
                  <TableCell className="font-sans text-foreground hidden md:table-cell">{alert.category}</TableCell>
                  <TableCell className="font-sans text-foreground hidden sm:table-cell">{alert.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getSeverityBadgeVariant(alert.severity)} className="font-sans">
                      {alert.severity}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-muted-foreground py-4 font-sans">Nenhum alerta para a categoria selecionada.</p>
        )}
      </CardContent>
    </Card>
  );
}
