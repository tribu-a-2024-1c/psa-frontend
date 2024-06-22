import type { Task } from '@/api/types';
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

export function TaskTable({
  tasks,
  isLoading,
}: {
  tasks: Task[] | null | undefined;
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
            : tasks?.map((task: Task) => (
                <TableRow key={task.id}>
                  <TableCell>{task?.id}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{formatDate(task.startDate)}</TableCell>
                  <TableCell>{formatDate(task.endDate)}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.estimation}</TableCell>
                  <TableCell>{task.project.title}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
