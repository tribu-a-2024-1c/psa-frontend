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
  const sortedProjects = projects
    ? [...projects].sort((a, b) => {
        const idA = typeof a.id === 'number' ? a.id : parseInt(a.id, 10);
        const idB = typeof b.id === 'number' ? b.id : parseInt(b.id, 10);
        return idB - idA;
      })
    : [];

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
            : sortedProjects?.map((project: Project) => (
                <TableRow key={project.id}>
                  <TableCell className="text-center">{project?.id}</TableCell>
                  <TableCell className="text-center">{project.title}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-center">
                    {project.description}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(project.startDate)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(project.endDate)}
                  </TableCell>
                  <TableCell className="text-center">
                    {project.status}
                  </TableCell>
                  <TableCell className="text-center">
                    {project.leader
                      ? `${project.leader.name} ${project.leader.lastName}`
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="text-center">
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
