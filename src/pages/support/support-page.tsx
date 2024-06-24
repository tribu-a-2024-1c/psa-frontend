import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { client } from '@/api/common/client';
import type { Ticket } from '@/api/types';
import { Button } from '@/components/ui/button';

import { SupportTable } from './support-table';

export function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    client.support
      .get('/tickets')
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        setTickets([]);
        console.error('Error fetching tickets:', error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-1">
      <div className="flex-1 px-4 py-2">
        <div className="mb-4 flex items-center">
          <h1 className="text-2xl font-bold">Tickets</h1>
          <Button
            className="ml-auto h-[40px]"
            size="sm"
            onClick={() => navigate('/tickets/new')}
          >
            Crear Ticket
          </Button>
        </div>
        {!isLoading && !tickets?.length && 'No hay tickets disponibles'}
        {(isLoading || (tickets && tickets?.length > 0)) && (
          <SupportTable tickets={tickets} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
