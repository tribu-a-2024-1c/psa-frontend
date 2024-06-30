import { Link } from 'react-router-dom';

import type { ShowProject } from '@/api/types';
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
  projects: ShowProject[] | null | undefined;
  isLoading: boolean;
}) {
  const sortedProjects = projects
    ? [...projects].sort((a, b) => {
        const idA =
          typeof a.id === 'number' ? a.id : parseInt(a.id as string, 10);
        const idB =
          typeof b.id === 'number' ? b.id : parseInt(b.id as string, 10);
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
            : sortedProjects?.map((project: ShowProject) => (
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
                    <div className="flex flex-col gap-2">
                      <Link
                        to={`/tasks?projectId=${project.id}`}
                        className="underline"
                      >
                        Ver tareas asociadas
                      </Link>
                      <Link
                        to={`/projects/edit/${project.id}`}
                        className="underline"
                      >
                        Editar Projecto
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
