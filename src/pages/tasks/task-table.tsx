import { Link } from 'react-router-dom';

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
  const sortedTasks = tasks ? [...tasks].sort((a, b) => b.id - a.id) : [];

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
                        <div className="h-6 w-full animate-pulse rounded bg-gray-300 !text-center dark:bg-gray-700"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            : sortedTasks?.map((task: Task) => (
                <TableRow key={task.id}>
                  <TableCell className="text-center">{task?.id}</TableCell>
                  <TableCell className="text-center">{task.title}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-center">
                    {task.description}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(task.startDate)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(task.endDate)}
                  </TableCell>
                  <TableCell className="text-center">{task.status}</TableCell>
                  <TableCell className="text-center">
                    {task.estimation}
                  </TableCell>
                  <TableCell className="text-center">
                    {task.project.title}
                  </TableCell>
                  <TableCell className="text-center">
                    {task.resource?.name && task.resource?.lastName
                      ? `${task.resource?.name} ${task.resource?.lastName}`
                      : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link
                      to={`/tasks/edit/${task.project.id}/${task.id}`}
                      className="underline"
                    >
                      Editar tarea
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
