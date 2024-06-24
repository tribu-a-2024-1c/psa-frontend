import { Link } from 'react-router-dom';

import type { Ticket } from '@/api/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/utils';

import { TABLE_COLUMNS } from './constants';

export function SupportTable({
  tickets,
  isLoading,
}: {
  tickets: Ticket[] | null | undefined;
  isLoading: boolean;
}) {
  const sortedTickets = tickets ? [...tickets].sort((a, b) => b.id - a.id) : [];

  return (
    <div className="rounded-lg border bg-gray-100 shadow-sm dark:bg-gray-950">
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_COLUMNS.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array(5)
                .fill(null)
                .map((_, index) => (
                  <TableRow key={index}>
                    {TABLE_COLUMNS.map((_, idx) => (
                      <TableCell key={idx}>
                        <div className="h-6 w-full animate-pulse rounded bg-gray-300 !text-center dark:bg-gray-700"></div>
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="h-6 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                    </TableCell>
                  </TableRow>
                ))
            : sortedTickets?.map((ticket: Ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="text-center">{ticket?.id}</TableCell>
                  <TableCell className="text-center">{ticket.title}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-center">
                    {ticket.description}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(ticket.startDate)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(ticket.endDate)}
                  </TableCell>
                  <TableCell className="text-center">{ticket.status}</TableCell>
                  <TableCell className="text-center">
                    {ticket.severity}
                  </TableCell>
                  <TableCell className="text-center">
                    {ticket.productVersion.product.name}
                  </TableCell>
                  <TableCell className="text-center">{ticket.type}</TableCell>
                  <TableCell className="text-center">
                    {ticket.resource?.name && ticket.resource?.lastName
                      ? `${ticket.resource?.name} ${ticket.resource?.lastName}`
                      : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col gap-2">
                      <Link
                        to={`/tasks?ticketId=${ticket.id}`}
                        className="underline"
                      >
                        Ver tareas asociadas
                      </Link>
                      <Link
                        to={`/tickets/edit/${ticket.id}`}
                        className="underline"
                      >
                        Editar Ticket
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
