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

interface DeleteProjectDialogProps {
  project: Project | null;
  onDelete: (project: Project) => void;
  onClose: () => void;
}

export function DeleteProjectDialog({
  project,
  onDelete,
  onClose,
}: DeleteProjectDialogProps) {
  return (
    <AlertDialog open={!!project} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmación de Eliminación</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Está seguro que desea eliminar el proyecto "{project?.title}"?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => project && onDelete(project)}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
