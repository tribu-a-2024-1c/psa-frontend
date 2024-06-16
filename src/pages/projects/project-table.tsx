import type { ReactNode } from 'react';

import type { Project } from '@/api/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ACTION_BUTTONS, TABLE_COLUMNS } from './constants';

function ActionButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Button variant="ghost" size="icon">
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  );
}

export function ProjectTable({ projects }: { projects: Project[] }) {
  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_COLUMNS.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project: Project) => (
            <TableRow key={project.id}>
              <TableCell>{project?.id}</TableCell>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.endDate}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{project.client.name}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {ACTION_BUTTONS.map(({ label, icon }) => (
                    <ActionButton key={label} icon={icon} label={label} />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
