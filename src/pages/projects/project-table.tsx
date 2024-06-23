import { Link } from 'react-router-dom';

import type { Project } from '@/api/types';
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

export function ProjectTable({
  projects,
  isLoading,
}: {
  projects: Project[] | null | undefined;
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
            : projects?.map((project: Project) => (
                <TableRow key={project.id}>
                  <TableCell>{project?.id}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{formatDate(project.startDate)}</TableCell>
                  <TableCell>{formatDate(project.endDate)}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>
                    <Link
                      to={`/tasks?projectId=${project.id}`}
                      className="underline"
                    >
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
