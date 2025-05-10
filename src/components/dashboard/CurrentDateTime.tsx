'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // For Portuguese date formatting

export default function CurrentDateTime() {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(
        `${format(now, 'PPP', { locale: ptBR })} | ${format(now, 'p', { locale: ptBR })}`
      );
    };

    updateDateTime(); // Initial call
    const intervalId = setInterval(updateDateTime, 1000 * 60); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  if (!currentDateTime) {
    return <div className="text-sm text-muted-foreground font-sans">Carregando data/hora...</div>;
  }

  return <div className="text-sm text-foreground font-sans hidden sm:block">{currentDateTime}</div>;
}
