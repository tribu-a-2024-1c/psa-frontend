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

function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick}>
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  );
}

export function ProjectTable({ projects }: { projects: Project[] }) {
  const handleActionClick = (action: string, project: Project) => {
    switch (action) {
      case 'View':
        console.log({ action, project });
        // onView(project);
        break;
      case 'Edit':
        console.log({ action, project });
        break;
      case 'Delete':
        console.log({ action, project });
        break;
      default:
        break;
    }
  };

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
                    <ActionButton
                      key={label}
                      icon={icon}
                      label={label}
                      onClick={() => handleActionClick(label, project)}
                    />
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
