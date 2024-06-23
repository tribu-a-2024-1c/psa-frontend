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
  return (
    <div className="rounded-lg border bg-gray-100 shadow-sm dark:bg-gray-950">
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_COLUMNS.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
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
                        <div className="h-6 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            : tickets?.map((support: Ticket) => (
                <TableRow key={support.id}>
                  <TableCell>{support?.id}</TableCell>
                  <TableCell>{support.title}</TableCell>
                  <TableCell>{support.description}</TableCell>
                  <TableCell>{formatDate(support.startDate)}</TableCell>
                  <TableCell>{formatDate(support.endDate)}</TableCell>
                  <TableCell>{support.status}</TableCell>
                  <TableCell>
                    <Link to="/tasks" className="underline">
                      Ver tareas asociadas
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
