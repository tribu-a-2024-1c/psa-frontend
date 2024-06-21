import type { Project } from '@/api/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ViewProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export function ViewProjectDialog({
  project,
  onClose,
}: ViewProjectDialogProps) {
  return (
    <AlertDialog open={!!project} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Detalles del Proyecto</AlertDialogTitle>
          <AlertDialogDescription>
            <p>ID del Proyecto: {project?.id}</p>
            <p>Título: {project?.title}</p>
            <p>Descripción: {project?.description}</p>
            <p>Fecha de Inicio: {project?.startDate}</p>
            <p>Fecha de Finalización: {project?.endDate}</p>
            <p>Estado: {project?.status}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
