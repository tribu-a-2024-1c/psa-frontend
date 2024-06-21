import { type ReactNode, useState } from 'react';

import type { Project } from '@/api/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import { DeleteProjectDialog } from './delete-project-dialog';
import { ViewProjectDialog } from './view-project-dialog';

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
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);
  const [viewProject, setViewProject] = useState<Project | null>(null);
  const [editProject, setEditProject] = useState<Project | null>(null);

  const handleActionClick = (action: string, project: Project) => {
    switch (action) {
      case 'View':
        setViewProject(project);
        break;
      case 'Edit':
        setEditProject(project);
        break;
      case 'Delete':
        setDeleteProject(project);
        break;
      default:
        break;
    }
  };

  const handleDelete = (project: Project) => {
    console.log('Deleting project:', project);
    // Implement delete functionality (e.g., API call)
    setDeleteProject(null);
  };

  const handleEditSave = (project: Project) => {
    console.log('Saving edited project:', project);
    // Implement save functionality (e.g., API call)
    setEditProject(null);
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
      {editProject && (
        <AlertDialog open={true} onOpenChange={() => setEditProject(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Project</AlertDialogTitle>
              <AlertDialogDescription>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditSave(editProject);
                  }}
                >
                  <label>
                    Title:
                    <input
                      type="text"
                      value={editProject.title}
                      onChange={(e) =>
                        setEditProject({
                          ...editProject,
                          title: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    Description:
                    <textarea
                      value={editProject.description}
                      onChange={(e) =>
                        setEditProject({
                          ...editProject,
                          description: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    Start Date:
                    <input
                      type="date"
                      value={editProject.startDate}
                      onChange={(e) =>
                        setEditProject({
                          ...editProject,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    End Date:
                    <input
                      type="date"
                      value={editProject.endDate}
                      onChange={(e) =>
                        setEditProject({
                          ...editProject,
                          endDate: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    Status:
                    <select
                      value={editProject.status}
                      onChange={(e) =>
                        setEditProject({
                          ...editProject,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </label>
                  <AlertDialogFooter>
                    <AlertDialogAction type="submit">Save</AlertDialogAction>
                    <AlertDialogCancel onClick={() => setEditProject(null)}>
                      Cancel
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <ViewProjectDialog
        project={viewProject}
        onClose={() => setViewProject(null)}
      />
      <DeleteProjectDialog
        project={deleteProject}
        onDelete={handleDelete}
        onClose={() => setDeleteProject(null)}
      />
    </div>
  );
}
